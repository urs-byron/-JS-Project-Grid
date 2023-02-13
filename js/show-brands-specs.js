// import { getElement, getElements, getData, getCSSVar } from "./util-fx.js";
// import { stn_screen, tab_screen } from "./util-var.js";

// const filter_brand_head = getElement(".product-brands-head");
// let filter_brand_cont_h = ``;
// const filter_brand_cont = getElement(".product-brands-content ul");

// const change_filter_brand_cont_h = () => {
//   if (window.innerWidth > 890) {
//     filter_brand_cont_h = getCSSVar(
//       filter_brand_cont,
//       "--product-filter-brand-h"
//     ).replace("px", "");
//   } else if (window.innerWidth <= 890) {
//     filter_brand_cont_h = getCSSVar(
//       filter_brand_cont,
//       "--product-filter-brand-h"
//     ).replace("px", "");
//   }
//   if (!filter_brand_cont.classList.contains("scale-cont-y")) {
//     filter_brand_cont.style.setProperty("height", `${filter_brand_cont_h}px`);
//   }
// };

// window.addEventListener("resize", (e) => {
//   change_filter_brand_cont_h();
// });

// filter_brand_head.addEventListener("click", (e) => {
//   if (filter_brand_cont.getBoundingClientRect().height) {
//     filter_brand_cont.style.setProperty("height", "0px");
//     filter_brand_cont.classList.add("scale-cont-y");
//   } else {
//     filter_brand_cont.classList.remove("scale-cont-y");
//     filter_brand_cont.style.setProperty("height", `${filter_brand_cont_h}px`);
//   }
// });

// const filter_specs_head = getElement(".product-functions-head");
