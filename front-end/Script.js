function fetchDataAndDisplay() {
    fetch('http://localhost:3000/dipasena/latest')
        .then(response => response.json())
        .then(data => {
            const suhu_air_permukaan = data.result[0].suhu_air_permukaan;
            const suhu_air_dasar= data.result[0].suhu_air_dasar;
            const suhu_ruang = data.result[0].suhu_ruang;
            const ph = data.result[0].ph;
            const salinitas = data.result[0].salinitas;
            const oxygen = data.result[0].oxygen;
            const amonia = data.result[0].amonia;
            document.getElementById('suhu_air_permukaan').innerHTML = suhu_air_permukaan;
            document.getElementById('suhu_air_dasar').innerHTML = suhu_air_dasar;
            document.getElementById('suhu_ruang').innerHTML = suhu_ruang;
            document.getElementById('ph').innerHTML = ph;
            document.getElementById('oxygen').innerHTML = oxygen;
            document.getElementById('salinitas').innerHTML = salinitas;
            document.getElementById('amonia').innerHTML = amonia;
            // document.getElementById('npm').innerHTML = data.npm;
        })
        .catch(error =>
            console.error('ada error:', error)
        );
}

// Fungsi ini akan dijalankan setiap satu detik
setInterval(fetchDataAndDisplay, 59000);

// Panggil fungsi ini saat halaman pertama kali dimuat untuk menampilkan data awal
fetchDataAndDisplay();



function fetchData() {
    fetch('http://localhost:3000/dipasena/tabel') // Ganti URL_API_ANDA dengan URL API JSON yang sesuai
        .then(response => response.json())
        .then(data => {
            const dataBody = document.getElementById('data-body');
            dataBody.innerHTML = ''; // Bersihkan isi tbody sebelum menambahkan data baru

            data.result.slice(0,10).forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.time}</td>
                    <td>${item.suhu_air_permukaan}</td>
                    <td>${item.suhu_air_dasar}</td>
                    <td>${item.suhu_ruang}</td>
                    <td>${item.salinitas}</td>
                    <td>${item.oxygen}</td>
                    <td>${item.ph}</td>
                    <td>${item.amonia}</td>
                `;

                dataBody.appendChild(row);
            });
        })
        .catch(error =>
            console.error('Ada error:', error)
        );
}
// Panggil fetchData untuk pertama kali
setInterval(fetchData, 59000);
fetchData();


// CHART SUHU PERMUKAAN 
const url = 'http://localhost:3000/dipasena/chart/suhu_per';
const chart = new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Suhu Air Permukaan',
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
            const suhu_air_permukaan = data.result[data.count - 1].suhu_air_permukaan;
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(suhu_air_permukaan);
            chart.update();
        });
}

setInterval(updateChart, 1000);

// CHART PH 
const urlPh = 'http://localhost:3000/dipasena/chart/ph';
const chartPh = new Chart(document.getElementById('myChartPh'), {
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

function updateChartPh() {
    fetch(urlPh)
        .then(response => response.json())
        .then(data => {
            const time = new Date().toLocaleTimeString();
            const ph = data.result[data.count - 1].ph;
            chartPh.data.labels.push(time);
            chartPh.data.datasets[0].data.push(ph);
            chartPh.update();
        });
}

setInterval(updateChartPh, 1000);




function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = sidebar.style.left === '-200px' ? '0' : '-200px';
}

const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.2088, lng: 106.8456 }, // Koordinat yang diinginkan
    zoom: 12,
    width: 400,
    height: 300,
});