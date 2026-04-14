function parseRelations(rawRelations) {
	if (Array.isArray(rawRelations)) return rawRelations;
	if (typeof rawRelations === 'string') {
		try {
			const parsed = JSON.parse(rawRelations);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	return [];
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function getStationPopupData(properties = {}) {
	const relations = parseRelations(properties?.['@relations']);
	const rel = relations?.[0]?.reltags;

	const name = properties?.name || properties?.station || properties?.stadium || rel?.name || 'Station';
	const ref = properties?.ref || rel?.ref || 'N/A';

	return { name, ref };
}

function getStationFilter(activeRefs) {
	return ['all', ['==', '$type', 'Point'], ['in', ['get', 'ref'], ['literal', activeRefs]]];
}

export async function loadRailways({ map, base, metroState, lineOrder, maplibregl }) {
	if (!map.getSource('railways')) {
		try {
			const fetchURL = `${base}/mapData/railwaysData.geojson`;
			console.log('FETCH URL (Railways):', fetchURL);
			const response = await fetch(fetchURL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			map.addSource('railways', {
				type: 'geojson',
				data
			});
		} catch (error) {
			console.error('Failed to load railwaysData.geojson:', error);
			return;
		}
	}

	const beforeMetroId = lineOrder.map((key) => `metro-line-${key}`).find((id) => map.getLayer(id));

	if (!map.getLayer('rail-lines')) {
		const railLinesLayer = {
			id: 'rail-lines',
			type: 'line',
			source: 'railways',
			filter: [
				'any',
				['==', ['geometry-type'], 'LineString'],
				['==', ['geometry-type'], 'MultiLineString']
			],
			paint: {
				'line-width': 2,
				'line-color': 'yellow',
				'line-opacity': 0.7
			}
		};

		if (beforeMetroId) map.addLayer(railLinesLayer, beforeMetroId);
		else map.addLayer(railLinesLayer);
	}

	if (!map.getLayer('rail-stations')) {
		const railStationsLayer = {
			id: 'rail-stations',
			type: 'circle',
			source: 'railways',
			filter: ['==', '$type', 'Point'],
			paint: {
				'circle-radius': 4,
				'circle-color': '#ffffff',
				'circle-stroke-width': 2,
				'circle-stroke-color': '#666'
			}
		};

		if (beforeMetroId) map.addLayer(railStationsLayer, beforeMetroId);
		else map.addLayer(railStationsLayer);
	}

	if (!map.getLayer('rail-station-labels')) {
		map.addLayer({
			id: 'rail-station-labels',
			type: 'symbol',
			source: 'railways',
			filter: ['==', '$type', 'Point'],
			layout: {
				'text-field': ['get', 'name'],
				'text-font': ['Noto Sans Regular'],
				'text-size': 10,
				'text-anchor': 'left',
				'text-offset': [0.8, 0]
			},
			minzoom: 14,
			paint: {
				'text-color': '#ffffff',
				'text-halo-color': '#000000',
				'text-halo-width': 1
			}
		});
	}

	updateRailwaysVisibility({ map, metroState });

	if (!map._railStationEventsAdded) {
		map._railStationEventsAdded = true;

		map.on('click', 'rail-stations', (e) => {
			const name = e.features?.[0]?.properties?.name || 'Railway Station';

			new maplibregl.Popup().setLngLat(e.lngLat).setText(name).addTo(map);
		});

		map.on('mouseenter', 'rail-stations', () => {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'rail-stations', () => {
			map.getCanvas().style.cursor = '';
		});
	}
}

export async function loadMetro({ map, base, metroState, lineOrder, lineMap, constructionRefs, maplibregl }) {
	const activeRefs = lineOrder.filter((key) => !!metroState?.[key]).map((key) => lineMap[key]);

	console.log('activeRefs:', activeRefs);
	if (activeRefs.length === 0) {
		console.log('No active refs. Ensure this is intentional (all toggles off).');
	}

	const stationFilter = getStationFilter(activeRefs);

	if (!map.getSource('metro')) {
		try {
			const fetchURL = `${base}/mapData/metroData.geojson`;
			console.log('BASE:', base);
			console.log('FETCH URL (Metro):', fetchURL);
			const response = await fetch(fetchURL);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			map.addSource('metro', {
				type: 'geojson',
				data
			});
		} catch (error) {
			console.error('Failed to load metroData.geojson:', error);
			return;
		}
	}

	for (const key of lineOrder) {
		const ref = lineMap[key];
		const layerId = `metro-line-${key}`;
		const isConstruction = constructionRefs.includes(ref);

		const lineFilter = [
			'all',
			['in', ['geometry-type'], ['literal', ['LineString', 'MultiLineString']]],
			['==', ['get', 'ref'], ref]
		];

		if (!map.getLayer(layerId)) {
			map.addLayer({
				id: layerId,
				type: 'line',
				source: 'metro',
				filter: lineFilter,
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
					visibility: metroState?.[key] ? 'visible' : 'none'
				},
				paint: {
					'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 12, 4.5, 15, 7],
					'line-color': ['coalesce', ['get', 'colour'], '#00ffcc'],
					'line-opacity': isConstruction ? 0.9 : 0.95,
					...(isConstruction ? { 'line-dasharray': [2.2, 2] } : {})
				}
			});
		} else {
			map.setFilter(layerId, lineFilter);
			map.setLayoutProperty(layerId, 'visibility', metroState?.[key] ? 'visible' : 'none');
		}
	}

	if (!map.getLayer('stations')) {
		map.addLayer({
			id: 'stations',
			type: 'circle',
			source: 'metro',
			filter: ['==', '$type', 'Point'],
			paint: {
				'circle-radius': 5,
				'circle-color': ['coalesce', ['get', 'colour'], '#ffffff'],
				'circle-stroke-width': 3,
				'circle-stroke-color': '#000000',
				'circle-opacity': 0.6
			}
		});
	} else {
		map.setFilter('stations', stationFilter);
	}

	if (!map.getLayer('metro-station-labels')) {
		map.addLayer({
			id: 'metro-station-labels',
			type: 'symbol',
			source: 'metro',
			filter: ['==', '$type', 'Point'],
			layout: {
				'text-field': ['get', 'name'],
				'text-font': ['Noto Sans Regular'],
				'text-size': 12,
				'text-anchor': 'left',
				'text-offset': [0.8, 0]
			},
			paint: {
				'text-color': '#ffffff',
				'text-halo-color': '#000000',
				'text-halo-width': 1
			}
		});
	} else {
		map.setFilter('metro-station-labels', stationFilter);
	}

	if (!map._stationEventsAdded) {
		map._stationEventsAdded = true;
		map.on('click', 'stations', (e) => {
			const feature = e.features?.[0];
			if (!feature) return;

			const props = feature.properties;
			const { name, ref } = getStationPopupData(props);

			if (name === 'Station' || ref === 'N/A') {
				console.log(feature.properties);
			}

			const popupHtml = `
                                    <div style="min-width: 220px; color: #fff; font-family: Inter, system-ui, sans-serif;">
                                        <div style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">${escapeHtml(name)}</div>
                                        <div style="font-size: 12px; opacity: 0.8;">Line Ref: ${escapeHtml(ref)}</div>
                                    </div>
                                `;

			new maplibregl.Popup({ className: 'station-popup' })
				.setLngLat(e.lngLat)
				.setHTML(popupHtml)
				.addTo(map);
		});

		map.on('mouseenter', 'stations', () => {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'stations', () => {
			map.getCanvas().style.cursor = '';
		});
	}
}

export function updateRailwaysVisibility({ map, metroState }) {
	const railVisibility = metroState?.trainLine ? 'visible' : 'none';
	if (map.getLayer('rail-lines')) map.setLayoutProperty('rail-lines', 'visibility', railVisibility);
	if (map.getLayer('rail-stations')) map.setLayoutProperty('rail-stations', 'visibility', railVisibility);
	if (map.getLayer('rail-station-labels')) map.setLayoutProperty('rail-station-labels', 'visibility', railVisibility);
}

export function updateMetroVisibility({ map, metroState, lineOrder, lineMap }) {
	const activeRefs = lineOrder.filter((key) => !!metroState?.[key]).map((key) => lineMap[key]);
	const stationFilter = getStationFilter(activeRefs);

	for (const key of lineOrder) {
		const layerId = `metro-line-${key}`;
		if (map.getLayer(layerId)) {
			map.setLayoutProperty(layerId, 'visibility', metroState?.[key] ? 'visible' : 'none');
		}
	}

	if (map.getLayer('stations')) map.setFilter('stations', stationFilter);
	if (map.getLayer('metro-station-labels')) map.setFilter('metro-station-labels', stationFilter);
}
