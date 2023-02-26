import { getElement, getCSSVar } from "./util-fx.js";

getElement(".show-user-options-btn").addEventListener("click", function (e) {
  const user_options = getElement(".user-options");
  if (getCSSVar(user_options, "--user-options-pos-top") === "-150%") {
    user_options.style.setProperty("--user-options-pos-top", "0%");
  } else {
    user_options.style.setProperty("--user-options-pos-top", "-150%");
  }
});

getElement(".user-options-navi").addEventListener("click", (e) => {
  if (localStorage.getItem("eh_music_shop_logged_account")) {
    if (e.target.classList.contains("fa-solid")) {
      [...e.currentTarget.parentElement.children[0].children].forEach(
        (cont) => {
          cont.classList.toggle("move-user-options-items");
        }
      );
    }
  }
});
