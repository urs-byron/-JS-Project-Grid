import { getElement, getElements, getData } from "./util-fx.js";
import { products_json_url } from "./util-var.js";

const OBJBrandsSpec = async (url) => {
  const data = await getData(url);
  const brands = [];
  const prod_specs = new Set();
  let min_price = Number.MAX_SAFE_INTEGER,
    max_price = 0;

  for (const brnd in data.brands) {
    brands.push(data.brands[brnd].name);

    for (const prod of data.brands[brnd].products) {
      prod.price > max_price ? (max_price = prod.price) : null;
      prod.price < min_price ? (min_price = prod.price) : null;

      for (const spec of prod.specification.items) {
        prod_specs.add(spec);
      }
    }
  }

  const dataSet = { brands, prod_specs, min_price, max_price };
  return dataSet;
};

const HTMLNumberInput = async (data) => {
  const min_input = getElement("#min-product-price");
  const max_input = getElement("#max-product-price");

  min_input.setAttribute("min", `${data.min_price}`);
  max_input.setAttribute("min", `${data.min_price}`);
  min_input.setAttribute("max", `${data.max_price}`);
  max_input.setAttribute("max", `${data.max_price}`);

  min_input.setAttribute("placeholder", `${data.min_price}`);
  max_input.setAttribute("placeholder", `${data.max_price}`);
};

const HTMLCheckboxInput = async (data, html_cont, name) => {
  const cont = getElement(html_cont);

  for (const spec of data) {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", name);
    input.setAttribute("id", `${spec.replace(" ", "-")}`);
    input.setAttribute("value", spec);

    const wht_space = document.createTextNode(" ");

    const label = document.createElement("label");
    label.setAttribute("for", `${spec.replace(" ", "-")}`);
    const label_txt = document.createTextNode(spec);
    label.appendChild(label_txt);

    const li = document.createElement("li");
    li.classList.add("no-select-highlight");
    li.appendChild(input);
    li.appendChild(wht_space);
    li.appendChild(label);

    cont.appendChild(li);
  }
};

const HTMLFilterInput = async (url) => {
  const { brands, prod_specs, min_price, max_price } = await OBJBrandsSpec(url);
  HTMLCheckboxInput(prod_specs, ".product-specs-content ul", "product-spec");
  HTMLCheckboxInput(brands, ".product-brands-content ul", "product-brand");
  HTMLNumberInput({ min_price, max_price });
};

export { HTMLFilterInput };
