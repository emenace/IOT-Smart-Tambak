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
setInterval(fetchDataAndDisplay, 600000);

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
setInterval(fetchData, 600000);
fetchData();

// LINE Chart Suhu AIr 
fetch('http://localhost:3000/dipasena/chart/suhuAir')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time1);
    const suhuAirPermukaan = latestData.map(item => item.suhu_air_permukaan);
    const suhuAirDasar = latestData.map(item => item.suhu_air_dasar);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Suhu Air Permukaan',
                data: suhuAirPermukaan,
                borderColor: '#35A29F',
                tension: 0.1
            },
            {
                label: 'Suhu Air Dasar',
                data: suhuAirDasar,
                borderColor: ' #071952',
                tension: 0.1
            }]
        }
    });
})

.catch(error => console.error('Error:', error));

// Line Chart PH 
fetch('http://localhost:3000/dipasena/chart/ph')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time2);
    const ph = latestData.map(item => item.ph);

    const grafPh = document.getElementById('ChartPh').getContext('2d');
    new Chart(grafPh, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'pH Air ',
                data: ph,
                borderColor: '#1A5D1A',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart KADAR OKSIGEN
fetch('http://localhost:3000/dipasena/chart/do')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time3);
    const Oksigen = latestData.map(item => item.oxygen);

    const grafDo = document.getElementById('ChartDo').getContext('2d');
    new Chart(grafDo, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Kadar Oksigen ',
                data: Oksigen,
                borderColor: '#E55604',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));


// Line Chart SALINITAS
fetch('http://localhost:3000/dipasena/chart/salinitas')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time4);
    const salinitas = latestData.map(item => item.salinitas);

    const grafSalinitas = document.getElementById('ChartSalinitas').getContext('2d');
    new Chart(grafSalinitas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Salinitas Air ',
                data: salinitas,
                borderColor: '#16FF00',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart Suhu Ruang
fetch('http://localhost:3000/dipasena/chart/suhuRuang')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time5);
    const suhuRuang = latestData.map(item => item.suhu_ruang);

    const grafSuhuRuang = document.getElementById('ChartSuhuRuang').getContext('2d');
    new Chart(grafSuhuRuang, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Suhu Ruang ',
                data: suhuRuang,
                borderColor: '#FFED00',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart Amonia
fetch('http://localhost:3000/dipasena/chart/amonia')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time6);
    const amonia_ = latestData.map(item => item.amonia);

    const grafAmonia = document.getElementById('ChartAmonia').getContext('2d');
    new Chart(grafAmonia, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amonia ',
                data: amonia_,
                borderColor: '#C21010',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));




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

