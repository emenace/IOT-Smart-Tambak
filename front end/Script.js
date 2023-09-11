function fetchDataAndDisplay() {
    fetch('')
        .then(response => response.json())
        .then(data => {
            const humidity = data.result[0].humidity;
            const pressure = data.result[0].pressure;
            const temperature = data.result[0].temperature;
            const ph = data.result[0].ph;
            const time = data.result[0].time;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('pressure').innerHTML = pressure;
            document.getElementById('temperature').innerHTML = temperature;
            document.getElementById('ph').innerHTML = ph;
            // document.getElementById('npm').innerHTML = data.npm;
        })
        .catch(error =>
            console.error('ada error:', error)
        );
}

// Fungsi ini akan dijalankan setiap satu detik
setInterval(fetchDataAndDisplay, 1000);

// Panggil fungsi ini saat halaman pertama kali dimuat untuk menampilkan data awal
fetchDataAndDisplay();

document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay();
    setInterval(fetchDataAndDisplay, 10000); // Refresh data setiap 10 detik
});

function fetchData() {
    fetch('http://localhost:3000/dipasena/latest')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Mengosongkan isi tabel sebelum mengisi data baru

            data.result.slice(0, 10).forEach((entry, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.time}</td>
                    <td>${entry.humidity}</td>
                    <td>${entry.pressure}</td>
                    <td>${entry.temperature}</td>
                    <td>${entry.ph}</td>
                    <td>${entry.tds}</td>
                    <td>${entry.amonia}</td>
                    <td>${entry.kadar_oksigen}</td>
                    <td>${entry.temp_air}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error =>
            console.error('Ada error:', error)
        );
}

// Panggil fetchData untuk pertama kali
fetchData();

// Set interval untuk memperbarui data setiap 5 detik
setInterval(fetchData, 5000);



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