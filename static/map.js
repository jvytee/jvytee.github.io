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
                {maxZoom: 18, attribution: tileAttribution}
            ).addTo(mapObj);
            marker(location).addTo(mapObj);
        }
    };
};
