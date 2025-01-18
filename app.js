// Menambahkan angka atau simbol ke tampilan utama
function appendToDisplay(value) {
    const primaryDisplay = document.getElementById("primary-display"); // Ambil elemen display utama

    // Jika tampilan utama adalah "0" dan tombol yang ditekan bukan "+/-" atau koma ","
    if (primaryDisplay.innerText === "0" && value !== "+/-" && value !== ",") {
        primaryDisplay.innerText = value; // Ganti "0" dengan angka atau simbol yang ditekan
    } else if (value === "+/-") { // Jika tombol +/- ditekan
        // Balikkan tanda positif/negatif
        primaryDisplay.innerText = primaryDisplay.innerText.startsWith('-')
            ? primaryDisplay.innerText.slice(1)
            : '-' + primaryDisplay.innerText;
    } else {
        // Tambahkan karakter ke display
        primaryDisplay.innerText += value;
    }

    convertTemperature(); // Perbarui hasil konversi secara otomatis
}

// Fungsi untuk menghapus tampilan utama
function clearDisplay() {
    document.getElementById("primary-display").innerText = "0";
    document.getElementById("secondary-display").innerText = "0";
}

// Fungsi untuk menghapus karakter terakhir dari tampilan utama
function backspace() {
    const primaryDisplay = document.getElementById("primary-display");
    if (primaryDisplay.innerText.length > 1) {
        primaryDisplay.innerText = primaryDisplay.innerText.slice(0, -1);
    } else {
        primaryDisplay.innerText = "0";
    }
    convertTemperature(); // Perbarui hasil konversi setelah menghapus
}

// Fungsi untuk konversi suhu secara otomatis
function convertTemperature() {
    const primaryDisplay = document.getElementById("primary-display");
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
    const inputValue = parseFloat(primaryDisplay.innerText); // Ambil input dari tampilan utama

    // Menghindari konversi jika input tidak valid
    if (isNaN(inputValue)) {
        document.getElementById("secondary-display").innerText = "Invalid Input";
        return;
    }

    let convertedValue;

    // Konversi suhu berdasarkan unit yang dipilih
    if (fromUnit === 'Celsius') {
        if (toUnit === 'Fahrenheit') {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (toUnit === 'Kelvin') {
            convertedValue = inputValue + 273.15;
        } else {
            convertedValue = inputValue; // Tidak ada konversi jika sama
        }
    } else if (fromUnit === 'Fahrenheit') {
        if (toUnit === 'Celsius') {
            convertedValue = (inputValue - 32) * 5/9;
        } else if (toUnit === 'Kelvin') {
            convertedValue = ((inputValue - 32) * 5/9) + 273.15;
        } else {
            convertedValue = inputValue; // Tidak ada konversi jika sama
        }
    } else if (fromUnit === 'Kelvin') {
        if (toUnit === 'Celsius') {
            convertedValue = inputValue - 273.15;
        } else if (toUnit === 'Fahrenheit') {
            convertedValue = ((inputValue - 273.15) * 9/5) + 32;
        } else {
            convertedValue = inputValue; // Tidak ada konversi jika sama
        }
    }

    // Tampilkan hasil konversi ke tampilan sekunder
    document.getElementById("secondary-display").innerText = convertedValue.toFixed(2);
}
