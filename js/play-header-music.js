const header_music = document.querySelector(".header-bg-music");
const header_bg_container = document.querySelector(".header-bg-container");

header_bg_container.addEventListener("click", (element) => {
  if (header_music.paused) {
    header_music.play();
  } else {
    header_music.pause();
  }
  header_bg_container.classList.toggle("header-bg-container-pause");
});
