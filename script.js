// Referensi ke elemen input tampilan
const display = document.getElementById('display'); // Mengambil elemen input display
const historyList = document.getElementById('history'); // Mengambil elemen daftar riwayat

// Fungsi untuk membersihkan tampilan
function clearDisplay() {
    display.value = ''; // Mengosongkan nilai pada input display
}

function appendToDisplay(value) {
    const lastChar = display.value.slice(-1); // Ambil karakter terakhir yang dimasukkan
    const operators = ['+', '-', '*', '/', '%']; // Daftar operator

    // Cek apakah karakter terakhir dan yang baru adalah operator
    if (operators.includes(lastChar) && operators.includes(value)) {
        return; // Jika iya, hentikan fungsi (tidak menambahkan karakter baru)
    }

    display.value += value; // Tambahkan karakter ke input display
}


// Fungsi untuk menghapus karakter terakhir
function backspace() {
    display.value = display.value.slice(0, -1); // Menghapus karakter terakhir dari input display
}

// Fungsi untuk menghitung hasil ekspresi
function calculate() {
    try {
        let expression = display.value; // Mengambil nilai dari input display

        // Proses persentase untuk berbagai operasi
        expression = expression.replace(/([\d.]+)\s*([\+\-\*\/])\s*([\d.]+)%/g, (match, num, operator, percent) => {
            num = parseFloat(num.replace(/\./g, '')); // Hapus titik ribuan dan konversi ke angka
            const percentageValue = (num * parseFloat(percent)) / 100; // Hitung nilai persentase

            switch (operator) {
                case '+':
                    return `${num} + ${percentageValue}`; // Tambahkan persentase
                case '-':
                    return `${num} - ${percentageValue}`; // Kurangi persentase
                case '*':
                    return `${num} * (${parseFloat(percent)} / 100)`; // Kalikan dengan persentase
                case '/':
                    return `${num} / (${parseFloat(percent)} / 100)`; // Bagi dengan persentase
                default:
                    return match; // Tidak ada perubahan jika operator tidak valid
            }
        });

        // Evaluasi ekspresi matematika
        const result = eval(expression); // Menghitung hasil ekspresi

        if (result !== undefined) {
            const formattedResult = result.toLocaleString('id-ID'); // Format hasil dengan pemisah ribuan
            addToHistory(`${display.value} = ${formattedResult}`); // Tambahkan ke riwayat
            display.value = formattedResult; // Tampilkan hasil yang diformat
        }
    } catch (error) {
        alert('Perhitungan tidak valid'); // Tampilkan pesan error jika terjadi kesalahan
    }
}

// Fungsi untuk menambahkan simbol persen
function percentage() {
    if (display.value !== '') {
        display.value += '%'; // Tambahkan simbol persen ke input display
    }
}

// Fungsi untuk menambahkan ke riwayat
function addToHistory(entry) {
    const listItem = document.createElement('li'); // Buat elemen <li> baru
    listItem.textContent = entry; // Set teks dari elemen <li> dengan entri riwayat
    listItem.onclick = function () {
        display.value = entry.split(' = ')[0]; // Ketika diklik, tampilkan ekspresi awal di display
    };
    historyList.appendChild(listItem); // Tambahkan elemen <li> ke daftar riwayat
}

// Fungsi untuk menghapus riwayat
function clearHistory() {
    historyList.innerHTML = ''; // Kosongkan daftar riwayat
}

// Fungsi untuk menangani input dari keyboard
function handleKeyboardInput(event) {
    const key = event.key; // Ambil tombol yang ditekan

    // Jika tombol adalah angka, operator, titik, atau persen
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
        appendToDisplay(key); // Tambahkan ke display
    } else if (key === 'Enter') {
        calculate(); // Hitung hasil jika tombol Enter ditekan
    } else if (key === 'Backspace') {
        backspace(); // Hapus karakter terakhir jika tombol Backspace ditekan
    } else if (key === 'Escape') {
        clearDisplay(); // Bersihkan display jika tombol Escape ditekan
    }
}

// Tambahkan event listener untuk mendeteksi input keyboard
document.addEventListener('keydown', handleKeyboardInput); // Deteksi tombol yang ditekan