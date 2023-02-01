const uni_logo_url =
  "/01_personal_project/P_Site_Grid/res/affiliated-universities/affiliated-universities.json";
const page = document.querySelector("body");
const uni_logo_container = document.querySelector(
  ".affiliated-universities-logo-container"
);
const gen_loading = document.querySelector(".gen-loading-container");

window.addEventListener("DOMContentLoaded", async (element) => {
  try {
    uni_logo_container.innerHTML = "";
    const res = await fetch(`${window.location.origin}` + uni_logo_url);
    const data = await res.json();
    gen_loading.classList.add("hide-gen-loading");
    setUniLogos(data.uni_logo);
    setAffiliatedUniTransX();
  } catch (error) {
    throw new Error(error);
  }
});

window.addEventListener("resize", () => {
  setAffiliatedUniTransX();
});

const setUniLogos = (uni_logo_set) => {
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

      uni_logo_container.appendChild(logo_set);
    }
  });
};

const setAffiliatedUniTransX = () => {
  uni_logo_container.style.setProperty(
    "--logo-width-translate",
    -(
      150 +
      uni_logo_container.getBoundingClientRect().width -
      page.getBoundingClientRect().width
    ) + "px"
  );
};
