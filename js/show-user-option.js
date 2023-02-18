import { getElement, getCSSVar } from "./util-fx.js";

getElement(".show-user-options-btn").addEventListener("click", function (e) {
  const user_options = getElement(".user-options");
  if (getCSSVar(user_options, "--user-options-pos-top") === "-150%") {
    user_options.style.setProperty("--user-options-pos-top", "0%");
  } else {
    user_options.style.setProperty("--user-options-pos-top", "-150%");
  }
});
