const form = document.getElementById("form");
const ColorInput = document.querySelector('[id="fontColor"]');
const BgColorInput = document.querySelector('[id="bgColor"]');
const MyBody = document.querySelector("body");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedColor = ColorInput.value;
  const selectedBgColor = BgColorInput.value;

  MyBody.style.backgroundColor = selectedBgColor;
  MyBody.style.color = selectedColor;
});

const MyMusic = document.querySelector("audio");

const currentMusic = document.querySelector("source");

const baseURL = "http://127.0.0.1:5500/assets/audio/";

const MySongs = [
  "04_Burden.mp3",
  "05_Fracture.mp3",
  "01_The_End_of_All_We_Know.mp3",
  "06_Demon_Of_The_Fall.mp3",
  "02_Sorceress.mp3",
  "03_The_Wilde_Flowers.mp3",
  "04_Will_O_The_Wisp.mp3",
];

let contador = 1;

function changeSong() {
  setSong(contador);
  contador++;
  return contador === MySongs.length ? (contador = 0) : contador;
}

const setSong = async (index) => {
  if (index === MySongs.length) {
    index = 0;
  }
  await localStorage.setItem("currentSong", index);
  currentMusic.src = baseURL + MySongs[index];
  MyMusic.load();
};

const playMusic = async () => {
  let currentSong = await localStorage.getItem("currentSong");
  let counterDefault = Number(currentSong);
  setSong(counterDefault);
};

playMusic();

setInterval(() => {
  if (MyMusic.ended) {
    console.log(MyMusic.ended, "terminou");
    changeSong();
  }
}, 1000);
