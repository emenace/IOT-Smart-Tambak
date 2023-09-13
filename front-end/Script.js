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
setInterval(fetchDataAndDisplay, 5000);

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
fetchData();

// chart 
// Fungsi untuk mengambil data dari API
async function fetchDataChart() {
    try {
        const response = await fetch('http://localhost:3000/dipasena/chart'); // Ganti dengan URL API Anda
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


// Inisialisasi Chart.js dan buat grafik
// script.js
const apiUrl = 'http://localhost:3000/dipasena/chart'; // Ganti dengan URL API yang sesuai
const chartElement = document.getElementById('line-chart');

async function fetchDataChart() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function createLineChart() {
    const data = await fetchDataChart();

    if (data.length === 0) {
        console.error('No data available.');
        return;
    }

    const timeLabels = data.map(item => item.time);
    const humidityData = data.map(item => item.humidity);
    const pressureData = data.map(item => item.pressure);

    const lineChart = new Chart(chartElement, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Humidity (%)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    data: humidityData,
                    yAxisID: 'humidity',
                },
                {
                    label: 'Pressure (hPa)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: pressureData,
                    yAxisID: 'pressure',
                },
            ],
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                humidity: {
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                    },
                },
                pressure: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Pressure (hPa)',
                    },
                },
            },
        },
    });
}

createLineChart();




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