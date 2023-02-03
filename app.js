import { uni_logo_url } from "../P_Site_Grid/js/util-var.js";
import { event_json_url } from "../P_Site_Grid/js/util-var.js";

import {
  HTMLUniLogos,
  CSSAffiliatedUniTransX,
  LoadAffiliatedUniversities,
} from "../P_Site_Grid/js/load-affil-uni.js";

import {
  LoadMainEvents,
  LoadEventDates,
} from "../P_Site_Grid/js/load-main-events.js";

window.addEventListener("DOMContentLoaded", (element) => {
  try {
    LoadAffiliatedUniversities(uni_logo_url);
    LoadMainEvents(event_json_url);
    LoadEventDates(event_json_url);
  } catch (error) {
    throw new Error(error);
  }
});

window.addEventListener("resize", (element) => {
  try {
    CSSAffiliatedUniTransX();
  } catch (error) {
    throw new Error(error);
  }
});
