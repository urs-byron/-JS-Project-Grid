import { getElement, getData } from "./util-fx.js";

// GENERATE HTML UNIVERSITY ANIMATION VARIABLES
const HTMLUniLogos = (container, uni_logo_set) => {
  uni_logo_set.forEach(({ name: uni_name, src: uni_logo }) => {
    {
      const logo_set = document.createElement("div");
      logo_set.classList.add("affiliated-university-img");

      const logo_over_bg = document.createElement("div");
      logo_over_bg.classList.add("affiliated-university-over-bg");
      logo_over_bg.setAttribute("title", `${uni_name}`);

      const logo_img = document.createElement("img");
      logo_img.setAttribute("src", uni_logo);
      logo_img.setAttribute("title", `${uni_name}`);
      logo_img.setAttribute("alt", `${uni_name} Logo`);

      logo_set.appendChild(logo_over_bg);
      logo_set.appendChild(logo_img);

      container.appendChild(logo_set);
    }
  });
};

// SET UNIVERSITY ANIMATION VARIABLES
const CSSAffiliatedUniTransX = () => {
  const page = getElement("body");
  const container = getElement(".affiliated-universities-logo-container");

  container.style.setProperty(
    "--logo-width-translate",
    -(
      150 +
      container.getBoundingClientRect().width -
      page.getBoundingClientRect().width
    ) + "px"
  );
};

// LOAD UNIVERSITY LOGOS
const LoadAffiliatedUniversities = async (uni_logo_url) => {
  const page = getElement("body");
  const container = getElement(".affiliated-universities-logo-container");
  const loader = getElement(
    ".affiliated-universities-logo .gen-loading-container"
  );

  const data = await getData(uni_logo_url);
  loader.classList.add("hide-gen-loading");

  HTMLUniLogos(container, data.uni_logo);
  CSSAffiliatedUniTransX(page, container);
};

export { HTMLUniLogos, CSSAffiliatedUniTransX, LoadAffiliatedUniversities };
