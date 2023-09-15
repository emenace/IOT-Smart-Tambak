const url = 'http://localhost:3000/dipasena/chart/ph';
const chart = new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'pH',
            data: [],
            backgroundColor: 'rgba(0, 119, 204, 0.3)',
            borderColor: 'rgba(0, 119, 204, 0.8)',
            borderWidth: 2,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'second'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function updateChart() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const time = new Date().toLocaleTimeString();
            const ph = data.result[data.count - 1].ph;
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(ph);
            chart.update();
        });
}

setInterval(updateChart, 1000);
