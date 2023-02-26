import { hidePreLoader } from "./js/util-fx.js";
import { loadKartItems } from "./js/kart-load-items.js";
import { createLocalStorage } from "./js/util-fx.js";

window.addEventListener("load", async (e) => {
  try {
    createLocalStorage();
    hidePreLoader();
    loadKartItems();
  } catch (err) {
    throw new Error(err);
  }
});
