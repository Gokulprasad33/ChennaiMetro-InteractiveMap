<script>
    import maplibregl from 'maplibre-gl';
    import { Protocol } from 'pmtiles';
    import { onMount } from 'svelte';
    import "maplibre-gl/dist/maplibre-gl.css";
    import { layers, namedFlavor } from "@protomaps/basemaps";
    import ThemeSwitcher from '../components/ThemeSwitcher.svelte';

    let map;
    
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
        loadMetro();
      });

    //   Buggy
        loadMetro();
    }
    function loadMetro(){
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
                filter: [
                    "any",
                    ["==", ["geometry-type"], "LineString"],
                    ["==", ["geometry-type"], "MultiLineString"]
                ],
                paint: {
                    "line-width": 6,
                    "line-color": ["coalesce", ["get", "colour"], "#00ffcc"]
                }
            });
        }

            // STATIONS
            if (!map.getLayer("stations")) {
            map.addLayer({
                id: "stations",
                type: "circle",
                source: "metro",
                filter: ["==", "$type", "Point"],
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#ff0000"
                }
            });
        }

            // CLICK INTERACTION
            if (!map._stationEventsAdded) {
            map._stationEventsAdded = true;
            map.on("click", "stations", (e) => {
                const name = e.features[0].properties.name || "Station";

                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setText(name)
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
            zoom: 12
        });

        map.on("load", () => {
            loadMetro();
        });
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
    <div class="absolute top-50 right-5 z-10 flex flex-col ">
        <button class="m-3 px-6 py-2 rounded-full bg-grey/40 backdrop-blur-3xl text-white font-medium border border-white/20 hover:bg-white/50 transition-all">
            Line
        </button>
        <button class="m-3 px-6 py-2 rounded-full bg-grey/40 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/50 transition-all">
            About
        </button>
    </div>
    

</div>
