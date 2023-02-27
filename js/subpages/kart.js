import { hidePreLoader } from "../util-fx.js";
import { loadKartItems } from "../kart-load-items.js";
import { createLocalStorage } from "../util-fx.js";
import { setFooterYear } from "../util/util-footer.js";

window.addEventListener("load", async (e) => {
  try {
    createLocalStorage();
    hidePreLoader();
    loadKartItems();
    setFooterYear();
  } catch (err) {
    throw new Error(err);
  }
});
