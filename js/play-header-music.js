import { getElement } from "./util-fx.js";

const header_bg_container = getElement(".header-bg-container");

header_bg_container.addEventListener("click", (element) => {
  try {
    const header_music = getElement(".header-bg-music");

    if (header_music.paused) {
      header_music.play();
    } else {
      header_music.pause();
    }
    header_bg_container.classList.toggle("header-bg-container-pause");
  } catch (error) {
    throw new Error(error);
  }
});
