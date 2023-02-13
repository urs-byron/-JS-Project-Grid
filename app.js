import {
  uni_logo_url,
  event_json_url,
  products_json_url,
} from "./js/util-var.js";

import { hidePreLoader } from "./js/util-preloader.js";

import {
  HTMLUniLogos,
  CSSAffiliatedUniTransX,
  LoadAffiliatedUniversities,
} from "./js/util-affil-uni.js";

import { LoadBrands } from "./js/util-products.js";

import { LoadMainEvents, LoadEventDates } from "./js/util-main-events.js";

import { setFooterYear } from "./js/util-footer.js";

window.addEventListener("DOMContentLoaded", async (element) => {
  try {
    await LoadAffiliatedUniversities(uni_logo_url);

    await LoadBrands(products_json_url);

    await LoadMainEvents(event_json_url);
    await LoadEventDates(event_json_url);

    setFooterYear();
  } catch (error) {
    throw new Error(error);
  }
});

window.addEventListener("load", (element) => {
  try {
    hidePreLoader();
  } catch (err) {
    throw new Error(err);
  }
});

window.addEventListener("resize", (element) => {
  try {
    CSSAffiliatedUniTransX();
  } catch (error) {
    throw new Error(error);
  }
});
