// Buat sebuah objek untuk menyimpan data masing-masing stopwatch
const stopwatches = {};

// Fungsi untuk membuat stopwatch baru
function createStopwatch(id) {
    return {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        interval: null,
        isRunning: false,
        displayElement: document.getElementById(`stopwatch${id}`),

        updateDisplay: function() {
            let formattedMinutes = String(this.minutes).padStart(2, '0');
            let formattedSeconds = String(this.seconds).padStart(2, '0');
            let formattedMilliseconds = String(Math.floor(this.milliseconds / 10)).padStart(2, '0'); // Tampilkan 2 digit milidetik
            
            // Update tampilan dengan format menit:detik:milidetik
            this.displayElement.textContent = `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
        },

        start: function() {
            if (!this.isRunning) {
                this.interval = setInterval(() => {
                    this.milliseconds += 10;
                    if (this.milliseconds >= 1000) { // 1000 milidetik = 1 detik
                        this.milliseconds = 0;
                        this.seconds++;
                    }
                    if (this.seconds === 60) {
                        this.seconds = 0;
                        this.minutes++;
                    }
                    this.updateDisplay();
                }, 10); // Interval per 10 milidetik
                this.isRunning = true;
            }
        },

        stop: function() {
            clearInterval(this.interval);
            this.isRunning = false;

            // Update tabel setelah stopwatch berhenti
            const formattedTime = `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}:${String(Math.floor(this.milliseconds / 10)).padStart(2, '0')}`;
            document.getElementById(`time-${id}`).textContent = formattedTime;
        },

        reset: function() {
            this.stop();
            this.minutes = 0;
            this.seconds = 0;
            this.milliseconds = 0;
            this.updateDisplay();
        }
    };
}

// Inisialisasi stopwatch 1, 2, dan 3
stopwatches[1] = createStopwatch(1);
stopwatches[2] = createStopwatch(2);
stopwatches[3] = createStopwatch(3);

// Event listener untuk semua tombol
document.querySelectorAll('.start').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        stopwatches[id].start();
    });
});

document.querySelectorAll('.stop').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        stopwatches[id].stop();
    });
});

document.querySelectorAll('.reset').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        stopwatches[id].reset();
    });
});

// Simpan nilai performance dalam objek untuk setiap aktivitas, nilai awal 0
const performanceValues = {
    1: 0,
    2: 0,
    3: 0
};

// Event listener untuk menangani perubahan pada input performance
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', (e) => {
        const id = e.target.id.split('-')[1]; // Ambil ID aktivitas dari input ID
        const value = e.target.value; // Ambil nilai baru yang diinput
        performanceValues[id] = value; // Simpan nilai performance baru
        console.log(`Performance untuk Activity ${id}: ${value}%`);
    });
});
