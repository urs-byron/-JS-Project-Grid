import { hidePreLoader } from "./js/util-fx.js";
import { loadKartItems } from "./js/kart-load-account-items.js";
import { createLocalStorage } from "./js/util-fx.js";

window.addEventListener("load", async (e) => {
  createLocalStorage();
  hidePreLoader();
  loadKartItems();
});
