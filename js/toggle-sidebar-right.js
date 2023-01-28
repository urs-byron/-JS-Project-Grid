const sidebar_right_toggle = document.querySelector(".sidebar-right-toggle");
const sidebar_right = document.querySelector(".sidebar-right");
const html_body = document.querySelector("body");

const change_content_width = () => {
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
};

sidebar_right_toggle.addEventListener("click", function (e) {
  change_content_width();
  e.currentTarget.classList.toggle("rotate-sidebar-right-toggle");

  sidebar_right.classList.toggle("hide-sidebar-right");
});

const TabMediaQuery = "(max-width: 890px)";
const mediaQueryList = window.matchMedia(TabMediaQuery);

mediaQueryList.addEventListener("change", (event) => {
  if (event.matches) {
    sidebar_right_toggle.classList.add("rotate-sidebar-right-toggle");
    sidebar_right.classList.add("hide-sidebar-right");
    html_body.style.setProperty("--sidebar-right-space", "0");
  } else {
    html_body.style.setProperty("--sidebar-right-space", "105px");
  }
});
