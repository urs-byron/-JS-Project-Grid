const sidebar_right_toggle = document.querySelector(".sidebar-right-toggle");
const sidebar_right = document.querySelector(".sidebar-right");
const html_body = document.querySelector("body");

sidebar_right_toggle.addEventListener("click", function (e) {
  if (!sidebar_right.classList.contains("hide-sidebar-right")) {
    html_body.style.setProperty("--sidebar-right-space", "0");
  } else {
    if (window.innerWidth > 890) {
      html_body.style.setProperty("--sidebar-right-space", "105px");
    } else if (window.innerWidth <= 890 && window.innerWidth > 414) {
      html_body.style.setProperty("--sidebar-right-space", "85px");
    } else if (window.innerWidth <= 414) {
      html_body.style.setProperty("--sidebar-right-space", "70px");
    }
  }
  e.currentTarget.classList.toggle("rotate-sidebar-right-toggle");

  sidebar_right.classList.toggle("hide-sidebar-right");
});

const tabMediaQuery = "(max-width: 890px)";
const mobMediaQuery = "(max-width: 414px)";
const tabMediaQueryMatch = window.matchMedia(tabMediaQuery);
const mobMediaQueryMatch = window.matchMedia(mobMediaQuery);

tabMediaQueryMatch.addEventListener("change", (tab_event) => {
  if (tab_event.matches) {
    sidebar_right_toggle.classList.add("rotate-sidebar-right-toggle");
    sidebar_right.classList.add("hide-sidebar-right");
    html_body.style.setProperty("--sidebar-right-space", "0");
  } else {
    sidebar_right_toggle.classList.remove("rotate-sidebar-right-toggle");
    sidebar_right.classList.remove("hide-sidebar-right");
    html_body.style.setProperty("--sidebar-right-space", "105px");
  }
});

mobMediaQueryMatch.addEventListener("change", (mob_event) => {
  if (mob_event.matches) {
    if (!sidebar_right.classList.contains("hide-sidebar-right")) {
      html_body.style.setProperty("--sidebar-right-space", "70px");
    }
  } else {
    if (!sidebar_right.classList.contains("hide-sidebar-right")) {
      html_body.style.setProperty("--sidebar-right-space", "85px");
    }
  }
});
