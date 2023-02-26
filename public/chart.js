import {getChartStatus} from "./getChartStatus.js";

function getChart(data) {
    if (document.getElementById('second-block').firstChild) {
        document.getElementById('second-block').firstChild.remove()
    }
    let canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    document.getElementById('second-block').append(canvas);

    let ctx = document.getElementById('myChart').getContext("2d");

    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#f49080');


    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', "", "2", "", "4", "", "6", "", "8", "", "10", "", "12", "", '14', "", '16', "", '18', "", '20', "", '22', "", '24'],
            datasets: [{
                borderColor: gradientStroke,
                pointRadius: 0,
                lineTension: 0.5,
                fill: true,
                backgroundColor: gradientStroke,
                borderWidth: 1,
                data: data,
            }]
        },
        options: {


            plugins: {
                title: {
                    display: true,
                    text: "Частота по м. Ужгород",
                    font: {
                        size: 40
                    }
                },
                legend: {
                    display: false,
                    text: true,
                }
            },

            scales: {
                yAxes: [{
                    ticks: {

                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 20
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    }

                }],
                x: {
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        maxRotation: 0,
                        fontSize: 10,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    },


                }
            }
        }
    });
    Chart.defaults.font.size = 30
    Chart.defaults.font.weight = 'bold'
}
export {getChart}