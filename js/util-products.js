import { products_json_url } from "./util-var.js";

import { getElement, getElements, getData } from "./util-fx.js";

const LoadBrandHead = async (data) => {
  const cont = getElement(`${data.misc.style} .product-brand`);
  const { name: prod_brand, description: prod_desc, banner: prod_bg } = data;

  const head = document.createElement("h3");
  const head_text = document.createTextNode(prod_brand);
  head.appendChild(head_text);
  head.classList.add("product-brand-head");

  const info = document.createElement("div");

  const info_span_text = document.createTextNode("learn more");
  const info_span = document.createElement("span");
  info_span.appendChild(info_span_text);

  const info_symbol = document.createElement("i");
  info_symbol.classList.add("fa-solid", "fa-circle-info");

  const info_head = document.createElement("div");
  info_head.appendChild(info_span);
  info_head.appendChild(info_symbol);

  const info_desc_cont = document.createElement("div");
  const info_desc = document.createElement("p");
  const info_desc_text = document.createTextNode(prod_desc);

  info_desc.appendChild(info_desc_text);
  info_desc_cont.appendChild(info_desc);

  info.appendChild(info_head);
  info.appendChild(info_desc_cont);
  info.classList.add("product-brand-info");

  cont.style.background = `url("${prod_bg}") center / cover`;
  cont.appendChild(head);
  cont.appendChild(info);
};

const LoadBrandProducts = async (data) => {
  const cont = getElement(`${data.misc.style} .products-container`);

  const products = data.products.map((product) => {
    const {
      model,
      description,
      specification: { link: spec_link, items: spec_items },
      gallery: { link: desc_link, display: prod_img },
    } = product;

    return { model, description, spec_link, spec_items, desc_link, prod_img };
  });

  products.forEach((product) => {
    // SPECIFICATION
    const prod_spec = document.createElement("div");
    const prod_spec_cont = document.createElement("div");

    const prod_spec_items = product.spec_items.map((item) => {
      const spec_p = document.createElement("p");
      const spec_p_text = document.createTextNode(item);
      spec_p.appendChild(spec_p_text);
      return spec_p;
    });

    const prod_spec_link = document.createElement("div");
    const prod_spec_a = document.createElement("a");
    const prod_spec_a_text = document.createTextNode("specifications");
    prod_spec_a.appendChild(prod_spec_a_text);
    prod_spec_a.setAttribute("href", product.spec_link);
    prod_spec_a.classList.add("product-link");
    prod_spec_link.appendChild(prod_spec_a);
    prod_spec_link.classList.add("product-links");

    prod_spec_items.forEach((item) => {
      const prod_spec_sign = document.createElement("i");
      prod_spec_sign.classList.add("fa-regular", "fa-circle-check");
      prod_spec_cont.appendChild(prod_spec_sign);
      prod_spec_cont.appendChild(item);
    });

    prod_spec_cont.appendChild(prod_spec_link);
    prod_spec_cont.classList.add("product-specification-container");
    prod_spec.appendChild(prod_spec_cont);
    prod_spec.classList.add("product-specification");

    // DESCRIPTION
    const prod_desc = document.createElement("div");
    prod_desc.classList.add("product-description");

    const prod_desc_head = document.createElement("h4");
    const prod_desc_head_text = document.createTextNode(
      `Model ${product.model}`
    );
    prod_desc_head.appendChild(prod_desc_head_text);

    const prod_desc_p = document.createElement("p");
    const prod_desc_p_text = document.createTextNode(product.description);
    prod_desc_p.appendChild(prod_desc_p_text);

    prod_desc.appendChild(prod_desc_head);
    prod_desc.appendChild(prod_desc_p);

    // IMAGE
    const prod_img = document.createElement("img");
    prod_img.setAttribute("src", product.prod_img);
    prod_img.setAttribute("alt", `Model ${product.model}`);
    prod_img.setAttribute("title", `Model ${product.model}`);

    // PRODUCT LINKS
    const prod_links = document.createElement("div");
    prod_links.classList.add("product-links");

    const prod_var = document.createElement("a");
    prod_var.classList.add("product-link");
    prod_var.setAttribute("href", product.spec_link);
    const prod_var_text = document.createTextNode("variants");

    const prod_var_symb = document.createElement("i");
    prod_var_symb.classList.add("fa-solid", "fa-right-long");

    prod_var.appendChild(prod_var_text);
    prod_var.appendChild(prod_var_symb);

    const prod_room = document.createElement("a");
    prod_room.classList.add("product-link");
    prod_room.setAttribute("href", product.spec_link);
    const prod_room_text = document.createTextNode("viewroom");

    const prod_room_symb = document.createElement("i");
    prod_room_symb.classList.add("fa-solid", "fa-right-long");

    prod_room.appendChild(prod_room_text);
    prod_room.appendChild(prod_room_symb);

    prod_links.appendChild(prod_var);
    prod_links.appendChild(prod_room);

    // PRODUCT
    const prod = document.createElement("div");
    prod.classList.add("product");
    const prod_cont = document.createElement("div");
    prod_cont.classList.add("product-container");

    prod_cont.appendChild(prod_spec);
    prod_cont.appendChild(prod_desc);
    prod_cont.appendChild(prod_img);
    prod_cont.appendChild(prod_links);

    prod.appendChild(prod_cont);
    cont.appendChild(prod);
  });
};

const LoadBrandProductsNavi = async (data) => {
  const prod_nav_cont = getElement(
    `${data.misc.style} .product-navi-container`
  );

  prod_nav_cont.style.setProperty(
    "--product-navi--items",
    `${data.products.length}`
  );

  for (let index = 0; index < data.products.length; index++) {
    const prod_nav = document.createElement("div");
    prod_nav.classList.add("product-navi-item");
    prod_nav_cont.appendChild(prod_nav);
  }
};

const LoadBrands = async (url) => {
  const data = await getData(url);
  const loader = getElement(
    ".product-highlights-brands .gen-loading-container"
  );

  loader.classList.add("hide-gen-loading");
  for (const brand in data.brands) {
    await LoadBrandHead(data.brands[brand]);
    await LoadBrandProducts(data.brands[brand]);
    await LoadBrandProductsNavi(data.brands[brand]);
  }
};

export { LoadBrands };
