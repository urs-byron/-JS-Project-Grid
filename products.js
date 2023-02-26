import { products_json_url } from "./js/util-var.js";
import {
  getElement,
  getElements,
  hidePreLoader,
  createLocalStorage,
} from "./js/util-fx.js";
import { filterProducts } from "./js/filter-load-products.js";
import { HTMLFilterInput } from "./js/filter-load-brands-specs.js";
import { setFooterYear } from "./js/util-footer.js";

const prod_filter_form = getElement(".product-filter-container form");
const prod_filter_w_toggle = [...getElements(".product-filter-w-toggle")];

window.addEventListener("DOMContentLoaded", async (e) => {
  try {
    await HTMLFilterInput(products_json_url);
    await filterProducts();

    setFooterYear();
    createLocalStorage();
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

prod_filter_form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    await filterProducts();
  } catch (err) {
    throw new Error(err);
  }
});

prod_filter_w_toggle.forEach((filter) => {
  filter.addEventListener("click", function (e) {
    try {
      const filter_enabler = filter.querySelector(".filter-enabler");
      const filter_inputs = [...filter.querySelectorAll("input")];

      if (
        e.target.classList.contains("filter-enabler-container") ||
        e.target.classList.contains("filter-enabler-btn") ||
        e.target.classList.contains("fa-circle")
      ) {
        if (filter_enabler.classList.contains("product-filter-enabled")) {
          filter_enabler.classList.remove("product-filter-enabled");

          filter_inputs.forEach((input) => {
            input.removeAttribute("disabled");
          });
        } else {
          filter_enabler.classList.add("product-filter-enabled");

          filter_inputs.forEach((input) => {
            input.setAttribute("disabled", "true");
          });
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  });
});
