const initMap = (location, tileUrl, tileAttribution) => {
    const mapToggle = document.getElementById("map-toggle");
    const mapDiv = document.getElementById("map");
    let map = null;

    mapToggle.onclick = () => {
        const style = window.getComputedStyle(mapDiv);
        const display = style.getPropertyValue("display");

        if (display === "block") {
            mapDiv.style.display = "none";
            return;
        }

        mapDiv.style.display = "block";
        if (!map) {
            map = L.map(mapDiv).setView(location, 8);
            L.tileLayer(tileUrl, {
                maxZoom: 18,
                attribution: tileAttribution
            }).addTo(map);
            L.marker(location).addTo(map);
        }
    };
};
