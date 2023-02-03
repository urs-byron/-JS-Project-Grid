import { getElement } from "./util-fx.js";

const hidePreLoader = () => {
  getElement(".preloader").classList.add("hide-preloader");
};

export { hidePreLoader };
