import { getElement } from "./util-fx.js";

const setFooterYear = () => {
  getElement(".footer-date").textContent = new Date().getFullYear();
};

export { setFooterYear };
