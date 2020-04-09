/*
 * @Descripttion: 
 * @version: 
 * @Author: Anke Wang
 * @Date: 2020-04-04 15:31:42
 * @LastEditors: Anke Wang
 * @LastEditTime: 2020-04-09 13:57:18
 * 
 * Code reference:
 * Leaflet Map: https://leafletjs.com/
 */

import * as d3 from 'd3';
import { globalSearch } from './search';
import { nodeHighlight } from './partsHighlight';
import { updateNodeTable, updateNodeTableByVirus } from './nodeTable';
/**
 * @name: setCountryCoord
 * @description: pre calculated, to get dist-latlng
 * @param: null
 * @return: getLatlng
 * @detail: 
 */

export const setCountryCoord = () => {

    let countryCoord = [
        { "name": "China", "lat": 35.029996, "lng": 108.105469, },
        { "name": "Japan", "lat": 35.46067, "lng": 138.867188, },
        { "name": "Vietnam", "lat": 14.030015, "lng": 108.588867, },
        { "name": "Malaysia", "lat": 4.210484, "lng": 101.975769, },
        { "name": "Thailand", "lat": 15.870032, "lng": 100.992538, },
        { "name": "Singapore", "lat": 1.352083, "lng": 103.819839, },
        { "name": "SouthKorea", "lat": 37.663998, "lng": 127.978462, },
        { "name": "Nepal", "lat": 28.394857, "lng": 84.124008, },
        { "name": "Russia", "lat": 61.52401, "lng": 105.318756, },
        { "name": "Cambodia", "lat": 12.565679, "lng": 104.990963, },
        { "name": "Pakistan", "lat": 30.375321, "lng": 69.345116, },
        { "name": "UnitedStates", "lat": 37.09024, "lng": 263.671875, },
        { "name": "Canada", "lat": 58.631217, "lng": 249.257813, },
        { "name": "Brazil", "lat": -14.235004, "lng": 309.92528, },
        { "name": "Mexico", "lat": 23.634501, "lng": 258.552784, },
        { "name": "Iceland", "lat": 64.963051, "lng": -19.020835, },
        { "name": "Switzerland", "lat": 46.818188, "lng": 8.227512, },
        { "name": "Netherlands", "lat": 52.132633, "lng": 5.291266, },
        { "name": "Finland", "lat": 61.92411, "lng": 25.748151, },
        { "name": "Norway", "lat": 60.472024, "lng": 8.468946, },
        { "name": "Ireland", "lat": 53.41291, "lng": -8.24389, },
        { "name": "UnitedKingdom", "lat": 53.225768, "lng": -1.230469, },
        { "name": "France", "lat": 46.227638, "lng": 2.213749, },
        { "name": "Germany", "lat": 51.165691, "lng": 10.451526, },
        { "name": "Spain", "lat": 40.463667, "lng": -3.74922, },
        { "name": "Italy", "lat": 41.87194, "lng": 12.56738, },
        { "name": "Portugal", "lat": 39.399872, "lng": -8.224454, },
        { "name": "Belgium", "lat": 50.503887, "lng": 4.469936, },
        { "name": "Georgia", "lat": 42.315407, "lng": 43.356892, },
        { "name": "Luxembourg", "lat": 49.815273, "lng": 6.129583, },
        { "name": "NewZealand", "lat": -40.900557, "lng": 174.885971, },
        { "name": "Kuwait", "lat": 29.31166, "lng": 47.481766, },
        { "name": "Slovakia", "lat": 48.669026, "lng": 19.699024, },
        { "name": "Chile", "lat": -35.675147, "lng": 289.542969, },
        { "name": "SaudiArabia", "lat": 23.885942, "lng": 45.079162, },
        { "name": "Hungary", "lat": 47.162494, "lng": 19.503304, },
        { "name": "CzechRepublic", "lat": 49.817492, "lng": 15.472962, },
        { "name": "Poland", "lat": 51.919438, "lng": 19.145136, },
        { "name": "Luxemburg", "lat": 49.815273, "lng": 6.129583, },
        { "name": "Turkey", "lat": 38.963745, "lng": 35.243322, },
        { "name": "Lithuania", "lat": 55.169438, "lng": 23.881275, },
        { "name": "Denmark", "lat": 56.26392, "lng": 9.501785, },
        { "name": "Sweden", "lat": 60.128161, "lng": 18.643501, },
        { "name": "Australia", "lat": -25.274398, "lng": 133.775136, },
        { "name": "Senegal", "lat": 14.497401, "lng": -14.452362, },
        { "name": "Congo", "lat": -0.228021, "lng": 15.827659, },
        { "name": "Algeria", "lat": 28.033886, "lng": 1.659626, },
        { "name": "SouthAfrica", "lat": -30.559482, "lng": 22.937506, },
        { "name": "India", "lat": 20.593684, "lng": 78.96288, },
        { "name": "Austria", "lat": 47.516231, "lng": 14.550072, },
        { "name": "Alaska", "lat": 64.200844, "lng": 205.493668, },
        { "name": "Estonia", "lat": 58.595272, "lng": 25.013607, },
        { "name": "Argentina", "lat": -38.416097, "lng": 297.616672, },
        { "name": "Israel", "lat": 31.046051, "lng": 34.851612, },
        { "name": "Slovenia", "lat": 46.151241, "lng": 14.995463, },
        { "name": "Greece", "lat": 39.074208, "lng": 21.824312, },
        { "name": "Belarus", "lat": 53.709807, "lng": 27.953389, },
        { "name": "Latvia", "lat": 56.879635, "lng": 24.603189, },
    ];

    let getLatlng = {}

    countryCoord.forEach(function (c) {
        getLatlng[c.name] = [c.lat, c.lng];
        //getLatlng[c.name] = {"lat":c.lat,"lng":c.lng}
    });

    return getLatlng;
}


/**
 * @name: drawMap
 * @description: set basemap, may add different types later
 * @param1: null
 * @return: basemap
 * @detail: 
 */

export const drawMap = () => {

    let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    let bounds = new L.LatLngBounds(new L.LatLng(-85, -173), new L.LatLng(85, 450));

    // gray basemap
    let //grayscale = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
       // darkscale = L.tileLayer(mbUrl, { id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
       // outdoor = L.tileLayer(mbUrl, { id: 'mapbox/outdoors-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
       // streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
        satellitescale = L.tileLayer(mbUrl, { id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

    let mymap = L.map('mapid', {
        center: [40, 150],
        zoom: 1,
        minZoom: 1,
        maxZoom: 10,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        layers: satellitescale
    });

    let baseLayers = {
       // "Gray": grayscale,
     //   "Dark": darkscale,
      //  "Light": outdoor,
     //   "Streets": streets,
        "Satellite": satellitescale,
    };

    L.control.layers(baseLayers).addTo(mymap);

    // get location
    function onMapClick(e) {
        // create a custom popup
        var popupLocation = L.popup();
        // location: e.latlng.lat, e.latlng.lng
        // e.latlng -> eg. LatLng(51.50009, -0.08748)
        popupLocation.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(mymap);

    }
    // now add the click event detector to the map
    // mymap.on('click', onMapClick);

    return mymap;
};


/**
 * @name: drawCircle
 * @description: use d3, draw circle on the map
 * @param: {
 *      basemap -- return by drawMap
 *      countryName -- get latlng
 *      r -- circle radius
 *      color -- circle color
 *      }
 * @return: basemap
 * @detail: 
 */

export const drawCircle = (basemap, getLatlng, countryName, r, color, node, link, chart, uniqueVirus, graph) => {


    let mapNodeScale = d3.scaleSqrt()
        .domain(d3.extent(r))
        .range([2, 200])


    basemap.eachLayer(function (layer) {
        if (layer.id == 'mycircle')
            basemap.removeLayer(layer);
    });


    countryName.forEach(function (d, i) {

        let lat = getLatlng[d][0];
        let lng = getLatlng[d][1];

        let circlesLayer = L.circleMarker([lat, lng], {
            radius: 10 + mapNodeScale(r[i]) * 0.2, //r * 3500,
            color: color[i],
            fillColor: color[i],
            fillOpacity: 0.5
        }).addTo(basemap).bindPopup(d + ": " + r[i] + " isloates").on("click", e => {
            let res = globalSearch(d + "|country", graph)
            nodeHighlight(node, link, res, 0.2)
            let filterNodes = graph.nodes.filter(e => res.indexOf(e.id) >= 0)
            let a = uniqueVirus.filter(e => e.loci.split("-")[0] === d)
            updateNodeTableByVirus(a)

            chart.dispatchAction({
                type: 'restore'
            })

            chart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                name: a.map(e => e.date)
            })
        });

        circlesLayer.id = 'mycircle';
    });

}
