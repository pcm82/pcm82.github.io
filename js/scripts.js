/*!
* Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
* Copyright 2013-2020 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    const navbarCollapse = document.querySelector(".navbar-collapse");
    const collapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    document.querySelectorAll(".js-scroll-trigger").forEach((link) => {
        link.addEventListener("click", () => {
            if (collapse) {
                collapse.hide();
            }
        });
    });

    const sideNav = document.querySelector("#sideNav");
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#sideNav",
            rootMargin: "0px 0px -40%",
        });
    }

    initializeMaps();
});

function initializeMaps() {
    if (!window.L) {
        return;
    }

    const tileLayer = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const tileOptions = {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        detectRetina: true,
        maxZoom: 19,
    };

    const regionStyle = {
        color: "#14532d",
        fillColor: "#166534",
        fillOpacity: 0.34,
        weight: 2,
    };

    const pantanalStyle = {
        color: "#4d7c0f",
        fillColor: "#a7f3d0",
        fillOpacity: 0.42,
        weight: 2,
    };

    const markerOptions = {
        color: "#bd5d38",
        fillColor: "#bd5d38",
        fillOpacity: 0.9,
        radius: 6,
        weight: 2,
    };

    const countryStyle = {
        color: "#212529",
        fillColor: "#18769a",
        fillOpacity: 0.06,
        opacity: 0.9,
        weight: 2.3,
    };

    const createMap = (id, options) => {
        const element = document.getElementById(id);
        if (!element) {
            return null;
        }

        const map = L.map(element, {
            scrollWheelZoom: false,
            zoomControl: true,
        });

        L.tileLayer(tileLayer, tileOptions).addTo(map);
        map.fitBounds(options.bounds, { padding: [12, 12] });
        return map;
    };

    const addCountryBoundary = async (map, countryCode) => {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/johan/world.geo.json/master/countries/${countryCode}.geo.json`);
            const geojson = await response.json();
            L.geoJSON(geojson, {
                interactive: false,
                style: countryStyle,
            }).addTo(map);
        } catch (error) {
            console.warn(`Unable to load ${countryCode} boundary`, error);
        }
    };

    const addMarker = (map, latLng, label, labelLatLng) => {
        const marker = L.circleMarker(latLng, markerOptions).addTo(map);

        if (labelLatLng) {
            L.polyline([latLng, labelLatLng], {
                color: "#495057",
                dashArray: "3 5",
                opacity: 0.65,
                weight: 1.5,
            }).addTo(map);

            L.tooltip({
                className: "map-marker-label",
                direction: "center",
                opacity: 0.92,
                permanent: true,
            })
                .setContent(label)
                .setLatLng(labelLatLng)
                .addTo(map);
            return;
        }

        marker
            .bindTooltip(label, {
                className: "map-marker-label",
                direction: "top",
                offset: [0, -4],
                opacity: 0.92,
            })
            .addTo(map);
    };

    const peruMap = createMap("peru-map", {
        bounds: [
            [-20.0, -84.5],
            [1.5, -66.0],
        ],
    });

    if (peruMap) {
        addCountryBoundary(peruMap, "PER");

        L.polygon(
            [
                [-3.5, -75.5],
                [-5.8, -73.2],
                [-8.7, -72.1],
                [-12.1, -69.0],
                [-13.2, -70.5],
                [-10.5, -74.4],
                [-6.8, -76.8],
            ],
            regionStyle
        )
            .bindTooltip("Peruvian Amazon", {
                className: "map-region-label",
                direction: "center",
                permanent: true,
            })
            .addTo(peruMap);

        addMarker(peruMap, [-12.0464, -77.0428], "Lima", [-9.7, -81.0]);
        addMarker(peruMap, [-13.5319, -71.9675], "Cusco", [-16.7, -74.0]);
        addMarker(peruMap, [-12.5903, -69.1891], "Puerto Maldonado", [-14.2, -65.8]);
    }

    const brazilMap = createMap("brazil-map", {
        bounds: [
            [-34.5, -74.5],
            [5.5, -34.0],
        ],
    });

    if (brazilMap) {
        addCountryBoundary(brazilMap, "BRA");

        L.polygon(
            [
                [4.5, -73.5],
                [3.0, -57.0],
                [-1.5, -48.5],
                [-8.5, -50.5],
                [-11.0, -60.5],
                [-7.0, -70.5],
            ],
            regionStyle
        )
            .bindTooltip("Amazon", {
                className: "map-region-label",
                direction: "center",
                permanent: true,
            })
            .addTo(brazilMap);

        L.polygon(
            [
                [-15.5, -58.2],
                [-16.2, -55.0],
                [-19.0, -55.0],
                [-22.0, -57.0],
                [-20.3, -59.2],
                [-17.0, -59.6],
            ],
            pantanalStyle
        )
            .bindTooltip("Pantanal", {
                className: "map-region-label",
                direction: "center",
                permanent: true,
            })
            .addTo(brazilMap);

        addMarker(brazilMap, [-15.6014, -56.0979], "Cuiaba", [-13.2, -51.8]);
        addMarker(brazilMap, [-12.9777, -38.5016], "Salvador", [-10.3, -35.6]);
    }

    const usMap = createMap("us-map", {
        bounds: [
            [24.5, -125.0],
            [49.5, -66.0],
        ],
    });

    if (usMap) {
        addCountryBoundary(usMap, "USA");

        [
            [[39.2904, -76.6122], "Baltimore, MD", [35.2, -84.5]],
            [[42.6584, -71.1370], "Andover, MA", [46.8, -66.8]],
            [[42.4430, -76.5019], "Ithaca, NY", [46.0, -82.5]],
            [[32.7157, -117.1611], "San Diego, CA", [29.2, -113.0]],
            [[37.7749, -122.4194], "San Francisco, CA", [41.0, -124.0]],
        ].forEach(([latLng, label, labelLatLng]) => addMarker(usMap, latLng, label, labelLatLng));
    }
}
