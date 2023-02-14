import { getElement, getElements, getData } from "./js/util-fx.js";
import { products_json_url } from "./js/util-var.js";

const getModel = async () => {
  const data = await getData(products_json_url);
  const param_model = new RegExp(
    [...new URLSearchParams(window.location.search)][0][1],
    "gi"
  );
  let products = [];
  for (const brand in data.brands)
    products = [...products, ...data.brands[brand].products];

  let product = [];
  for (const model of products) {
    if (model.model.match(param_model)) {
      product.push(model);
    }
  }

  return product[0];
};

window.addEventListener("DOMContentLoaded", async function (e) {
  try {
    const product = await getModel();
    console.log(product.model);
  } catch (err) {
    throw new Error(err);
  }
});
