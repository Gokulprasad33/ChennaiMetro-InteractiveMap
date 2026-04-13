<script>
    import maplibregl from 'maplibre-gl';
    import { Protocol } from 'pmtiles';
    import { onMount } from 'svelte';
    import "maplibre-gl/dist/maplibre-gl.css";
    import { layers, namedFlavor } from "@protomaps/basemaps";
    import ThemeSwitcher from '../components/ThemeSwitcher.svelte';
    import LineChooser from '../components/LineChooser.svelte';
    import { metroLines } from '$lib/store';
    import { Button, Dialog } from "bits-ui";
    let map;
    let unsubscribeMetro = null;
    let currentMetroState = {
        blueLine: true,
        greenLine: true,
        orangeLine: true,
        violetLine: true,
        redLine: true,
    };

    const lineMap = {
        blueLine: "1",
        greenLine: "2",
        orangeLine: "4",// B
        violetLine: "3",
        redLine: "5",
    };

    const lineOrder = ['blueLine', 'greenLine', 'orangeLine', 'violetLine', 'redLine'];
    
    // User preference 
    let theme = $state("dark");
    let themeSwitcher = $state(false);
    function buildStyle(t) {
        // toggleTheme()
        return {
            version: 8,
            glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
            sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${t}`,
            sources: { protomaps: { type: "vector", url: "pmtiles:///chennai.pmtiles" } },
            layers: layers("protomaps", namedFlavor(t), { lang: "en" })
        };
    }

    function toggleTheme(){

        themeSwitcher = !themeSwitcher;
    }

    function changeTheme(newTheme) {
        theme = newTheme;
        map.setStyle({
        version: 8,
        glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
        sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${newTheme}`,
        sources: {
          protomaps: {
            type: "vector",
            url: "pmtiles:///chennai.pmtiles"
          }
        },
        layers: layers("protomaps", namedFlavor(newTheme), { lang: "en" })
      });

      map.once("style.load", () => {
        loadMetro(currentMetroState);
      });

    }

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
    
    function loadMetro(metroState){
        const activeRefs = lineOrder
            .filter((key) => !!metroState?.[key])
            .map((key) => lineMap[key]);

        console.log('activeRefs:', activeRefs);
        if (activeRefs.length === 0) {
            console.log('No active refs. Ensure this is intentional (all toggles off).');
        }

        const metroFilter = ["in", ["get", "ref"], ["literal", activeRefs]];
        const stationFilter = [
            "all",
            ["==", "$type", "Point"],
            ["in", ["get", "ref"], ["literal", activeRefs]]
        ];
            if (!map.getSource("metro")) {
                map.addSource("metro", {
                type: "geojson",
                data: "/mapData/metroData.geojson"
              });
            }
            if (!map.getLayer("metro-line")) {
            map.addLayer({
                id: "metro-line",
                type: "line",
                source: "metro",
                filter: metroFilter,
                paint: {
                    "line-width": 4,
                    "line-color": ["coalesce", ["get", "colour"], "#00ffcc"]
                }
            });
        } else {
            map.setFilter("metro-line", metroFilter);
        }

            // STATIONS
            if (!map.getLayer("stations")) {
            map.addLayer({
                id: "stations",
                type: "circle",
                source: "metro",
                filter:["==", "$type", "Point"],
                paint: {
                    "circle-radius": 5,
                    "circle-color": ["coalesce", ["get", "colour"], "#ffffff"],
                    "circle-stroke-width": 3,
                    "circle-stroke-color": "#000000",
                    "circle-opacity": 0.6
                },
                
            });
            
        }

            // CLICK INTERACTION
            if (!map._stationEventsAdded) {
            map._stationEventsAdded = true;
            map.on("click", "stations", (e) => {
                                const feature = e.features?.[0];
                                if (!feature) return;

                                const props = feature.properties;
                                const { name, ref } = getStationPopupData(props);

                                if (name === "Station" || ref === "N/A") {
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

            map.on("mouseenter", "stations", () => {
                map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "stations", () => {
                map.getCanvas().style.cursor = "";
            });
            // map.moveLayer("metro-line");
        }

        
        }

    onMount(() => {
        const protocol = new Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile.bind(protocol));


        map = new maplibregl.Map({
            container: "map",
            style: {
                version: 8,
                glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
                sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${theme}`,
                sources: {
                    protomaps: {
                        type: "vector",
                        url: "pmtiles:///chennai.pmtiles"
                    }
                },
                layers: layers("protomaps", namedFlavor(theme), { lang: "en" })
            },
            center: [80.2707, 13.0827],
            zoom: 12,

            minZoom:11
        });

        map.on("load", () => {
            unsubscribeMetro = metroLines.subscribe((value) => {
                currentMetroState = value;
                loadMetro(value);
            });
        });
        

        return () => {
            if (unsubscribeMetro) unsubscribeMetro();
        };
    });
</script>





<div class="relative w-full h-screen">
    <!-- Map -->
    <div id="map" class="w-full h-full"></div>

    <!-- Overlay -->
    <div class="absolute top-5 left-5 z-10 
              bg-black/60 text-white 
              px-4 py-2 rounded-lg 
              backdrop-blur-md">
        Chennai Transport Map
    </div>
    <button aria-label="Toggle Theme" onclick={toggleTheme}  class="absolute top-5 right-5 z-10 m-3 flex h-10 w-10 items-center justify-center rounded-full bg-grey/40 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/50 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>            
    </button>
    {#if themeSwitcher}
        <ThemeSwitcher value={theme} onChange={changeTheme} class="absolute  m-3 flex h-15 w-15 items-center justify-center rounded-full bg-grey/40 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/50 transition-all" />
    {/if}

    <div class="absolute top-50 right-5 z-10 flex flex-col gap-5">
        
        <LineChooser class="z-20 top-10 right-10"/>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button.Root
                            class="border border-white/20 bg-black/85 p-4 text-white rounded-3xl backdrop-blur-md bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex
	        h-10 items-center justify-center px-[21px] text-[17px]
	        font-semibold active:scale-[0.98] active:transition-all"
                        >
                            About
                        </Button.Root>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
                        <Dialog.Content
                            class="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-black/90 p-6 text-white shadow-xl"
                        >
                            <Dialog.Title class="mb-2 text-xl font-semibold">About</Dialog.Title>
                            <Dialog.Description class="text-sm leading-relaxed text-white/80">
                                Chennai Transport Map is an interactive metro visualization where you can toggle lines and explore stations.
                            </Dialog.Description>
                            <div class="mt-4 text-xs text-white/50">Built using MapLibre GL + Svelte</div>

                            <div class="mt-4 flex w-full flex-col gap-3">
                                <a
                                    href="https://github.com/Gokulprasad33"
                                    target="_blank"
                                    rel="noreferrer"
                                    class="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.08 1.85 2.82 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                                    </svg>
                                    <span>github.com/Gokulprasad33</span>
                                </a>

                                <a
                                    href="https://github.com/Gokulprasad33/ChennaiMetro-InteractiveMap"
                                    target="_blank"
                                    rel="noreferrer"
                                    class="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                                >
                                    Source Code
                                </a>
                            </div>

                            <div class="mt-6 flex justify-end">
                                <Dialog.Close asChild>
                                    <Button.Root class="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20">Close</Button.Root>
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
    </div>
    

</div>

<style>
    :global(.maplibregl-popup.station-popup .maplibregl-popup-content) {
        background: rgba(10, 10, 10, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        padding: 12px 14px;
    }

    :global(.maplibregl-popup.station-popup .maplibregl-popup-tip) {
        border-top-color: rgba(10, 10, 10, 0.95);
        border-bottom-color: rgba(10, 10, 10, 0.95);
    }

    :global(.maplibregl-popup.station-popup .maplibregl-popup-close-button) {
        color: rgba(255, 255, 255, 0.9);
    }
</style>
