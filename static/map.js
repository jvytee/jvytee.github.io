import { map, tileLayer, marker } from "./leaflet-src.esm.js";

export const initMap = (location, tileUrl, tileAttribution) => {
    const mapToggle = document.getElementById("map-toggle");
    const mapDiv = document.getElementById("map");
    let mapObj = null;

    mapToggle.onclick = () => {
        const style = window.getComputedStyle(mapDiv);
        const display = style.getPropertyValue("display");

        if (display === "block") {
            mapDiv.style.display = "none";
            return;
        }

        mapDiv.style.display = "block";
        if (!mapObj) {
            mapObj = map(mapDiv).setView(location, 8);
            tileLayer(
                tileUrl,
                { maxZoom: 18, attribution: tileAttribution }
            ).addTo(mapObj);
            marker(location).addTo(mapObj);
        }
    };
};

export const initOverviewMap = (locations, tileUrl, tileAttribution) => {
    const mapDiv = document.getElementById("overviewMap");
    const center = locations
        .reduce((acc, current) => [acc[0] + current[0], acc[1] + current[1]], [0.0, 0.0])
        .map((val) => val / locations.length);
    const mapObj = map(mapDiv).setView(center, 5);

    tileLayer(
        tileUrl,
        { maxZoom: 18, attribution: tileAttribution }
    ).addTo(mapObj);

    locations.forEach((location) => {
        marker(location).addTo(mapObj);
    });
};
