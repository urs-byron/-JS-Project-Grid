const footer_logo = document.querySelector(
  ".footer-container .website-logo-container"
);
const footer_item_head_set = document.querySelectorAll(".footer-item-head");

footer_item_head_set.forEach((footer_head) => {
  footer_head.addEventListener("click", function (head) {
    const head_content = footer_head.nextElementSibling;

    if (head_content.classList.contains("footer-item-content")) {
      // SHOW FOOTER CONTENT
      document.querySelectorAll(".footer-item-content").forEach((content) => {
        if (content.previousElementSibling !== head.currentTarget) {
          content.classList.remove("show-footer-item-content");
        }
      });
      head_content.classList.toggle("show-footer-item-content");

      // SHOW FOOTER LOGO
      footer_logo.classList.add("hide-footer-logo");
      if (!head_content.classList.contains("show-footer-item-content")) {
        footer_logo.classList.remove("hide-footer-logo");
      }

      // TOGGLE FOOTER HEAD STYLE
      footer_item_head_set.forEach((head_item) => {
        if (head_item !== head.currentTarget)
          head_item.classList.remove("footer-item-head-underline");
      });
      footer_head.classList.toggle("footer-item-head-underline");
    }
  });
});
