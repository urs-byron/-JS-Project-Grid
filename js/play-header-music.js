const header_music = document.querySelector(".header-bg-music");

document
  .querySelector(".header-bg-container")
  .addEventListener("click", (element) => {
    if (header_music.paused) {
      header_music.play();
    } else {
      {
        header_music.pause();
      }
    }
  });
