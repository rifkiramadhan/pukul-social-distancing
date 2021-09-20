const rumah = document.querySelectorAll('.rumah');
const covid = document.querySelectorAll('.covid');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let rumahSebelumnya;
let selesai;
let skor;

// Membuat fungsi untuk merandom kemunculan covid dan tidak mengulang dua kali
function randomRumah(rumah) {
    const t = Math.floor(Math.random() * rumah.length);
    const tRandom = rumah[t];
    
    if( tRandom == rumahSebelumnya ) {
        randomRumah(rumah);
    }
    rumahSebelumnya = tRandom;

    return tRandom;
}

// Membuat fungsi untuk merandom setiap covid yang muncul
function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Membuat fungsi untuk memunculkan covid
function munculkanCovid() {
    const tRandom = randomRumah(rumah);
    const wRandom = randomWaktu(300, 1000);
    tRandom.classList.add('muncul');
    
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if(!selesai) {
            munculkanCovid();
        }

    }, wRandom);
}

// Membuat fungsi untuk memulai permainan
function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;

    munculkanCovid();
    setTimeout(() => {
        selesai = true;
    }, 100000);
}

// Membuat fungsi untuk memukul setiap covid yang muncul
function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul');
    pop.play();
    papanSkor.textContent = skor;
}

covid.forEach(t => {
    t.addEventListener('click', pukul); 
});



