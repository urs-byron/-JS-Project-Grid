const primary_menu = document.querySelector(".primary-list");

document
  .querySelector(".primary-list-hover")
  .addEventListener("click", function (element) {
    if (element.target.classList.contains("primary-list-hover")) {
      hidePrimaryFx();
    }
  });

[...primary_menu.children].forEach((primary_menu_li) => {
  primary_menu_li.addEventListener("click", function (element) {
    if (element.currentTarget.getElementsByTagName("ul").length) {
      element.currentTarget
        .querySelector(".secondary-ul")
        .classList.toggle("show-secondary-list");
    }
    hideSecondaryFx(element.currentTarget);
  });
});

document
  .querySelector(".support-btn")
  .addEventListener("click", function (element) {
    document
      .querySelector(".support-window")
      .classList.toggle("show-support-window");
  });

function hideSecondaryFx(e) {
  document.querySelectorAll(".secondary-ul").forEach((secondary_ul) => {
    if (secondary_ul !== e.querySelector(".secondary-ul"))
      secondary_ul.classList.remove("show-secondary-list");
  });
}

function hidePrimaryFx() {
  primary_menu.classList.toggle("show-primary-list");
  hideSecondaryFx(document.querySelector(".primary-list a"));
}
