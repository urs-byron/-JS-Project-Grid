import { products_json_url } from "./js/util-var.js";
import { hidePreLoader } from "./js/util-fx.js";
import { filterProducts } from "./js/filter-load-products.js";
import { HTMLFilterInput } from "./js/filter-load-brands-specs.js";

window.addEventListener("DOMContentLoaded", async (e) => {
  try {
    await HTMLFilterInput(products_json_url);
    await filterProducts();
  } catch (err) {
    throw new Error(err);
  }
});
window.addEventListener("load", function (e) {
  try {
    hidePreLoader();
  } catch (err) {
    throw new Error(err);
  }
});
