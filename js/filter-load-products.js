import { getElement, getElements, getData } from "./util-fx.js";
import { products_json_url } from "./util-var.js";
import { addKartItemAnim, addKartItemQtty } from "./filter-add-kart.js";

const productFilterObj = () => {
  const product_filter_obj = {
    name: "",
    price: { min_price: 0, max_price: 0 },
    brands: [],
    specifications: [],
  };
  const prices = [
    getElement("#min-product-price"),
    getElement("#max-product-price"),
  ];

  if (getElement(".product-search input").value) {
    product_filter_obj.name = getElement(".product-search input").value;
  }
  if (parseInt(prices[0].value) > parseInt(prices[1].value)) {
    prices[0].value = prices[1].value;
  } else if (parseInt(prices[1].value) < parseInt(prices[0].value)) {
    prices[1].value = prices[0].value;
  }

  if (prices[0].disabled || !prices[0].value) {
    product_filter_obj.price.min_price = Number.MIN_SAFE_INTEGER;
  } else {
    product_filter_obj.price.min_price = parseInt(prices[0].value);
  }
  if (prices[1].disabled || !prices[1].value) {
    product_filter_obj.price.max_price = Number.MAX_SAFE_INTEGER;
  } else {
    product_filter_obj.price.max_price = parseInt(prices[1].value);
  }

  for (const brand of [...getElements(".product-brands input")]) {
    if (brand.disabled) {
      break;
    }
    if (brand.checked) {
      product_filter_obj.brands.push(brand.value);
    }
  }

  for (const spec of [...getElements(".product-specs input")]) {
    if (spec.disabled) {
      break;
    }
    if (spec.checked) {
      product_filter_obj.specifications.push(spec.value);
    }
  }

  return product_filter_obj;
};

const filterByBrand = (filter_obj, data) => {
  let products = [];

  if (filter_obj.brands.length) {
    for (const filter_brand in filter_obj.brands) {
      for (const brand in data.brands) {
        if (filter_obj.brands[filter_brand] === data.brands[brand].name) {
          products = [...products, ...data.brands[brand].products];
        }
      }
    }
  } else {
    for (const brand in data.brands) {
      products = [...products, ...data.brands[brand].products];
    }
  }

  return products;
};

const filterByName = (filter_obj, data) => {
  const product_searched = new RegExp(filter_obj.name, "gi");
  let products_by_name = [];

  for (const product of data) {
    if (product.model.match(product_searched)) {
      products_by_name.push(product);
    }
  }

  return products_by_name;
};

const filterByPrice = (filter_obj, data) => {
  let products_by_price = [];

  for (const product of data) {
    if (
      product.price >= filter_obj.price.min_price &&
      product.price <= filter_obj.price.max_price
    ) {
      products_by_price.push(product);
    }
  }

  return products_by_price;
};

const filterBySpec = (filter_obj, data) => {
  let products_by_spec = [];

  if (filter_obj.specifications.length) {
    for (const product of data) {
      for (const spec of product.specification.items) {
        if (filter_obj.specifications.includes(spec)) {
          products_by_spec.push(product);
          break;
        }
      }
    }
  } else {
    products_by_spec = [...data];
  }

  return products_by_spec;
};

const containMatchedProducts = (data) => {
  const cont = getElement(".filtered-products");
  const matched_products_container = getElement(".filtered-products-container");

  // SEARCH RESULT CLEANER
  while (matched_products_container.firstChild) {
    matched_products_container.removeChild(
      matched_products_container.firstChild
    );
  }

  // REMOVE SEARCH MESSAGE
  if (document.querySelector(".error-message")) {
    cont.removeChild(getElement(".error-message"));
  }

  // REMOVE LOADER
  const loader = getElement(".filtered-products .gen-loading-container");
  loader.classList.add("hide-gen-loading");

  // NO MATCHING SEARCH QUERY
  if (!data.length) {
    const matched_products_head_text = document.createTextNode(
      "No products matched. Try searching again!"
    );
    const matched_products_message = document.createElement("h4");
    matched_products_message.appendChild(matched_products_head_text);
    matched_products_message.classList.add("error-message");
    cont.appendChild(matched_products_message);

    return;
  }

  data.forEach((prod) => {
    // --- IMAGE SEC //

    // IMAGE
    const prod_img = document.createElement("img");
    prod_img.setAttribute("src", `${prod.gallery.display}`);
    prod_img.setAttribute("alt", `Model ${prod.model}`);
    prod_img.setAttribute("title", `Model ${prod.model}`);

    // ACTIONS
    const prod_act = document.createElement("div");
    prod_act.classList.add("product-act");
    const prod_act_cart = document.createElement("i");
    const prod_act_info = document.createElement("i");
    prod_act_cart.classList.add("fa-solid", "fa-cart-plus");
    prod_act_info.classList.add("fa-solid", "fa-tags");

    const prod_act_cart_a = document.createElement("a");
    const prod_act_info_a = document.createElement("a");
    prod_act_cart_a.appendChild(prod_act_cart);
    prod_act_cart_a.setAttribute("data-model", prod.model);
    prod_act_cart_a.setAttribute("data-price", prod.price);
    prod_act_cart_a.setAttribute("data-img-src", prod.gallery.display);
    prod_act_cart_a.classList.add("product-add-kart");
    prod_act_info_a.appendChild(prod_act_info);
    prod_act_info_a.setAttribute(
      "href",
      `model.html?product-model=${prod.model}`
    );

    prod_act_cart_a.addEventListener("click", addKartItemAnim);
    prod_act_cart_a.addEventListener("click", addKartItemQtty);

    prod_act.appendChild(prod_act_cart_a);
    prod_act.appendChild(prod_act_info_a);

    // CONTAINER
    const prod_img_cont = document.createElement("div");
    prod_img_cont.classList.add("product-img");
    prod_img_cont.appendChild(prod_img);
    prod_img_cont.appendChild(prod_act);

    // --- NAME SEC //

    // TITLE
    const prod_head_name = document.createTextNode(`Model ${prod.model}`);
    const prod_head = document.createElement("h4");
    prod_head.appendChild(prod_head_name);

    const prod_head_span_text = document.createTextNode(
      `\u{0024} ${prod.price}`
    );
    const prod_head_span = document.createElement("span");
    prod_head_span.appendChild(prod_head_span_text);

    // CONTAINER
    const prod_head_cont = document.createElement("div");
    prod_head_cont.classList.add("product-name");
    prod_head_cont.appendChild(prod_head);
    prod_head_cont.appendChild(prod_head_span);

    // --- PRODUCT CONTAINER SEC //
    const prod_cont = document.createElement("div");
    prod_cont.classList.add("matched-product-container");
    prod_cont.appendChild(prod_img_cont);
    prod_cont.appendChild(prod_head_cont);

    const matched_prod = document.createElement("div");
    matched_prod.classList.add("matched-product");
    matched_prod.appendChild(prod_cont);

    matched_products_container.appendChild(matched_prod);
  });
};

const filterProducts = async () => {
  const data = await getData(products_json_url);
  const product_filter_obj = productFilterObj();

  const products_by_brand = filterByBrand(product_filter_obj, data);
  const products_by_name = filterByName(product_filter_obj, products_by_brand);
  const products_by_price = filterByPrice(product_filter_obj, products_by_name);
  const products_by_spec = filterBySpec(product_filter_obj, products_by_price);
  containMatchedProducts(products_by_spec);
};

const disableSearchFilter = (e) => {
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
};

export { filterProducts, disableSearchFilter };
