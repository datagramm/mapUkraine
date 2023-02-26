import {getChart} from "./chart.js";


let dataTimeChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function getChartStatus () {
    dataTimeChart = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    fetch("/getChartStatus").then(res => res.json())
        .then(markers => {
         markers.forEach(marker => {
            dataTimeChart[Number(marker.timeOfMarkerInPanel.slice(0,2))] += 1;
         })

        }).then(() => {
         getChart(dataTimeChart)
    })


}

export {getChartStatus};