function fetchDataAndDisplay() {
    fetch('http://localhost:3000/dipasena/latest')
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



function fetchData() {
    fetch('http://localhost:3000/dipasena/tabel') // Ganti URL_API_ANDA dengan URL API JSON yang sesuai
        .then(response => response.json())
        .then(data => {
            const dataBody = document.getElementById('data-body');
            dataBody.innerHTML = ''; // Bersihkan isi tbody sebelum menambahkan data baru

            data.result.slice(0,10).forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.time}</td>
                    <td>${item.humidity}</td>
                    <td>${item.pressure}</td>
                    <td>${item.temperature}</td>
                    <td>${item.ph}</td>
                    <td>${item.tds}</td>
                    <td>${item.amonia}</td>
                    <td>${item.kadar_oksigen}</td>
                    <td>${item.temp_air}</td>
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

// Set interval untuk memperbarui data setiap 5 deti



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