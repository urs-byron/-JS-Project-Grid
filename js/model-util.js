import { getElement, getElements, getData, getCSSVar } from "./util-fx.js";
import { products_json_url } from "./util-var.js";
import { addKartItemQtty } from "./filter-add-kart.js";

let model = null,
  model_gallery = [],
  modal_gallery_src = [],
  model_images_cont = null,
  model_images_items = [],
  model_gallery_modal_img = null;

let model_gallery_counter = 0;
let model_images_limit = 0;
let checkGalleryMove = () => {};

// ----- FETCH GALLERY ----- //

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
const HTMLProductGallery = (product_model) => {
  getElement(".product-model-container").style.setProperty(
    "--product-model-gallery-items",
    `${product_model.gallery.items.length}`
  );
  const model_gallery_disp_cont = getElement(
    ".product-display-image-container"
  );
  const model_gallery_img_cont = getElement(".product-images-container");
  const model_modal_img = getElement(".product-model-modal-image img");
  product_model.gallery.items.forEach((disp_gallery_src, index) => {
    // CREATE GALLERY DISPLAY
    const disp_gallery_item_img = document.createElement("img");
    disp_gallery_item_img.setAttribute("src", disp_gallery_src);
    disp_gallery_item_img.setAttribute("title", product_model.model);

    const disp_gallery_item_cont = document.createElement("div");
    disp_gallery_item_cont.classList.add("product-display-image-item");
    disp_gallery_item_cont.appendChild(disp_gallery_item_img);

    model_gallery_disp_cont.appendChild(disp_gallery_item_cont);

    // CREATE GALLERY BOTTOM IMAGES
    const disp_gallery_imgs_img = document.createElement("img");
    disp_gallery_imgs_img.setAttribute("src", disp_gallery_src);
    disp_gallery_imgs_img.setAttribute("alt", `Model ${product_model.model}`);
    disp_gallery_imgs_img.setAttribute("title", `Model ${product_model.model}`);

    const disp_gallery_imgs_item_cont = document.createElement("div");
    disp_gallery_imgs_item_cont.classList.add("product-image-item");
    if (index === 0) {
      disp_gallery_imgs_item_cont.classList.add("product-main-image");
      model_modal_img.setAttribute("src", disp_gallery_src);
      model_modal_img.setAttribute("alt", `Model ${product_model.model}`);
      model_modal_img.setAttribute("title", `Model ${product_model.model}`);
    }
    disp_gallery_imgs_item_cont.appendChild(disp_gallery_imgs_img);

    model_gallery_img_cont.appendChild(disp_gallery_imgs_item_cont);
  });
};
const HTMLProductDetails = (product_model) => {
  const product_details_cont = getElement(".product-model-details-container");

  // PAGE TITLE
  getElement("title").innerText = `${
    product_model.brand[0].toUpperCase() + product_model.brand.slice(1)
  }: Model ${product_model.model}`;

  // PRODUCT DETAILS HEAD
  const prod_details_head_h2_text = document.createTextNode(
    `Model ${product_model.model}`
  );
  const prod_details_head_h2 = document.createElement("h2");
  prod_details_head_h2.appendChild(prod_details_head_h2_text);

  const prod_details_head_span_text = document.createTextNode(
    `\$ ${product_model.price}`
  );
  const prod_details_head_span = document.createElement("span");
  prod_details_head_span.appendChild(prod_details_head_span_text);

  const prod_details_head_cont = document.createElement("div");
  prod_details_head_cont.classList.add("product-model-head");
  prod_details_head_cont.appendChild(prod_details_head_h2);
  prod_details_head_cont.appendChild(prod_details_head_span);

  // PRODUCT DETAILS ACTIONS

  const prod_details_act_cont = document.createElement("div");
  prod_details_act_cont.classList.add("product-model-act");
  const prod_details_act_add = document.createElement("i");
  prod_details_act_add.classList.add("fa-solid", "fa-cart-plus");
  prod_details_act_add.addEventListener("click", addKartItemQtty);
  const prod_details_act_like = document.createElement("i");
  prod_details_act_like.classList.add("fa-regular", "fa-heart");

  prod_details_act_cont.appendChild(prod_details_act_add);
  prod_details_act_cont.appendChild(prod_details_act_like);

  prod_details_act_add.setAttribute("data-model", product_model.model);
  prod_details_act_add.setAttribute("data-price", product_model.price);
  prod_details_act_add.setAttribute(
    "data-img-src",
    product_model.gallery.display
  );
  // PRODUCT DETAILS CONTENT

  const prod_details_content = document.createElement("div");
  prod_details_content.classList.add("product-model-text");

  // PRODUCT DETAILS DESCRIPTION
  const prod_details_desc_h3 = document.createElement("h3");
  const prod_details_desc_h3_text = document.createTextNode("description");
  prod_details_desc_h3.appendChild(prod_details_desc_h3_text);
  const prod_details_desc_p = document.createElement("p");
  const prod_details_desc_p_text = document.createTextNode(
    product_model.description
  );
  prod_details_desc_p.appendChild(prod_details_desc_p_text);

  const prod_details_desc_cont = document.createElement("div");
  prod_details_content.classList.add("product-model-description");
  prod_details_desc_cont.appendChild(prod_details_desc_h3);
  prod_details_desc_cont.appendChild(prod_details_desc_p);

  // PRODUCT DETAILS DESCRIPTION

  const prod_details_spec_h3 = document.createElement("h3");
  const prod_details_spec_h3_text = document.createTextNode("specification");
  prod_details_spec_h3.appendChild(prod_details_spec_h3_text);

  const prod_spec_set_cont = document.createElement("div");
  prod_spec_set_cont.classList.add("product-model-spec-set");
  product_model.specification.items.forEach((spec) => {
    const prod_spec_span = document.createElement("span");
    const prod_spec_span_text = document.createTextNode(spec);
    prod_spec_span.appendChild(prod_spec_span_text);
    prod_spec_set_cont.appendChild(prod_spec_span);
  });

  const prod_details_spec_cont = document.createElement("div");
  prod_details_spec_cont.classList.add("product-model-specifications");
  prod_details_spec_cont.appendChild(prod_details_desc_cont);
  prod_details_spec_cont.appendChild(prod_spec_set_cont);

  prod_details_content.appendChild(prod_details_desc_cont);
  prod_details_content.appendChild(prod_details_spec_cont);

  product_details_cont.appendChild(prod_details_head_cont);
  product_details_cont.appendChild(prod_details_act_cont);
  product_details_cont.appendChild(prod_details_content);
};
const LoadProductModel = async () => {
  try {
    const product_model = await getModel();
    if (document.querySelector("main h2")) {
      getElement("main").removeChild(getElement("main h2"));
      return;
    }

    getElement("main .gen-loading-container").classList.add("hide-gen-loading");
    getElement("main").style.setProperty("--product-model-disp", "block");

    HTMLProductGallery(product_model);
    HTMLProductDetails(product_model);
    checkLoadedModelGallery();
  } catch (err) {
    const page_main = getElement("main");
    const error_head = document.createElement("h2");
    error_head.classList.add("error-message");
    const error_head_text = document.createTextNode(
      "404 Error: Model not Found"
    );
    error_head.appendChild(error_head_text);

    getElement("main .gen-loading-container").classList.add("hide-gen-loading");
    page_main.appendChild(error_head);
  }
};

export { LoadProductModel, getModel };

// ----- GALLERY FUNCTIONALITIES ----- //

const checkLoadedModelGallery = () => {
  if (document.querySelector(".product-display-image-item")) {
    model = getElement(".product-model-container");
    model_gallery = [...getElements(".product-display-image-item")];
    modal_gallery_src = model_gallery.map((img) => {
      return img.children[0].getAttribute("src");
    });
    model_images_cont = getElement(".product-images-container");
    model_images_items = [...getElements(".product-image-item")];
    model_gallery_modal_img = getElement(".product-model-modal-image img");
  } else {
    setTimeout(checkLoadedModelGallery, 1500);
  }
};
const changeImgTransX = () => {
  model.style.setProperty(
    "--product-image-item-transX",
    `calc(${(model_gallery_counter - model_images_limit) * -100}% - ${
      model_gallery_counter *
      parseFloat(
        getCSSVar(
          getElement(".product-model-container"),
          "--product-model-gallery-img-gr-gap"
        ).replace("rem", "")
      )
    }rem)`
  );
};
const changeDispTransX = () => {
  model.style.setProperty(
    "--product-display-item-transX",
    `${model_gallery_counter * -100}%`
  );
};
const checkGalleryCounterLimit = () => {
  if (model_gallery_counter < 0) {
    model_gallery_counter = model_gallery.length - 1;
  } else if (model_gallery_counter > model_gallery.length - 1) {
    model_gallery_counter = 0;
  }
};

// CHANGES THE MOVEMENT OF THE VISIBLE IMAGES GALLERY PER MEDIA QUERY
const genCheckGalleryMove = () => {
  checkGalleryMove = () => {
    (model_gallery_counter + 1) *
      model_images_items[0].getBoundingClientRect().width >
    model_images_cont.getBoundingClientRect().width
      ? changeImgTransX()
      : model.style.setProperty("--product-image-item-transX", `0%`);
    changeDispTransX();
  };
};
const tabCheckGalleryMove = () => {
  checkGalleryMove = () => {
    (model_gallery_counter + 1) *
      model_images_items[0].getBoundingClientRect().height >
    model_images_cont.getBoundingClientRect().height
      ? changeImgTransX()
      : model.style.setProperty("--product-image-item-transX", `0%`);
    changeDispTransX();
  };
};

// CHANGES THE NUMBER OF VISIBLE IMAGES GALLERY IMAGES PER MEDIA QUERY
const genChangeGalleryLimit = () => {
  model_images_limit =
    Math.floor(
      model_images_cont.getBoundingClientRect().width /
        model_images_items[0].getBoundingClientRect().width
    ) - 1;
  genCheckGalleryMove();
};
const tabChangeGalleryLimit = () => {
  model_images_limit =
    Math.floor(
      model_images_cont.getBoundingClientRect().height /
        model_images_items[0].getBoundingClientRect().height
    ) - 1;
  tabCheckGalleryMove();
};

export {
  tabCheckGalleryMove,
  genCheckGalleryMove,
  genChangeGalleryLimit,
  tabChangeGalleryLimit,
};

// DISPLAYS THE NEXT/PREV GALLERY IMAGE

const nextGalleryImg = () => {
  model_images_items[model_gallery_counter].classList.remove(
    "product-main-image"
  );
  model_gallery_counter++;
  checkGalleryCounterLimit();
  model_gallery_modal_img.setAttribute(
    "src",
    modal_gallery_src[model_gallery_counter]
  );
  model_images_items[model_gallery_counter].classList.add("product-main-image");
  checkGalleryMove();
};
const prevGalleryImg = () => {
  model_images_items[model_gallery_counter].classList.remove(
    "product-main-image"
  );
  model_gallery_counter--;
  checkGalleryCounterLimit();
  model_gallery_modal_img.setAttribute(
    "src",
    modal_gallery_src[model_gallery_counter]
  );
  model_images_items[model_gallery_counter].classList.add("product-main-image");
  checkGalleryMove();
};

// NAVIGATE MODEL GALLERY
// NEXT
[
  ...getElements("main .fa-chevron-right"),
  getElement("main .fa-chevron-down"),
].forEach((go_right_i) => {
  go_right_i.addEventListener("click", function () {
    nextGalleryImg();
  });
});

// PREV
[
  ...getElements("main .fa-chevron-left"),
  getElement("main .fa-chevron-up"),
].forEach((go_left_i) => {
  go_left_i.addEventListener("click", function () {
    prevGalleryImg();
  });
});

// OPEN & CLOSE MODEL MODAL GALLERY

getElement(".product-display-image").addEventListener("click", function () {
  getElement(".product-model-modal-image").style.setProperty(
    "--product-model-modal-image-pos-top",
    "0%"
  );
});
getElement(".product-model-modal-image-container .fa-xmark").addEventListener(
  "click",
  function () {
    getElement(".product-model-modal-image").style.setProperty(
      "--product-model-modal-image-pos-top",
      "-150%"
    );
  }
);
