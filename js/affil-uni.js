const university_logo_set = [
  {
    name: "Adventist University of the Philippines",
    src: "./res/affiliated-universities-logo/aup-logo.png",
  },
  {
    name: "Centro Escolar University",
    src: "./res/affiliated-universities-logo/ceu-logo.png",
  },
  {
    name: "De La Salle University",
    src: "./res/affiliated-universities-logo/dlsu-logo.png",
  },
  {
    name: "Lourdes College",
    src: "./res/affiliated-universities-logo/lc-logo.png",
  },
  {
    name: "Liceo de Cagayan University",
    src: "./res/affiliated-universities-logo/ldcu-logo.png",
  },
  {
    name: "Pamantasan ng Lungsod ng Maynila",
    src: "./res/affiliated-universities-logo/plm-logo.png",
  },
  {
    name: "Philippine Normal University",
    src: "./res/affiliated-universities-logo/pnu-logo.png",
  },
  {
    name: "Santa Isabela College of Maynila",
    src: "./res/affiliated-universities-logo/sic-logo.png",
  },
  {
    name: "Siliman University",
    src: "./res/affiliated-universities-logo/sili-logo.png",
  },
  {
    name: "University of the Immaculate Conception",
    src: "./res/affiliated-universities-logo/uic-logo.png",
  },
  {
    name: "University of the Philippines",
    src: "./res/affiliated-universities-logo/up-logo.png",
  },
  {
    name: "University of Rizal System",
    src: "./res/affiliated-universities-logo/ur-logo.png",
  },
  {
    name: "University of San Agustin",
    src: "./res/affiliated-universities-logo/us-ag-logo.png",
  },
  {
    name: "University of Santo Tomas",
    src: "./res/affiliated-universities-logo/ust-logo.png",
  },
];

const uni_logo_container = document.querySelector(
  ".affiliated-universities-logo-container"
);
const page = document.querySelector("body");

window.addEventListener("DOMContentLoaded", (element) => {
  uni_logo_container.innerHTML = "";

  university_logo_set.forEach((logo) => {
    const logo_set = document.createElement("div");
    logo_set.classList.add("affiliated-university-img");

    const logo_over_bg = document.createElement("div");
    logo_over_bg.classList.add("affiliated-university-over-bg");
    logo_over_bg.setAttribute("title", `${logo.name}`);

    const logo_img = document.createElement("img");
    logo_img.setAttribute("src", logo.src);
    logo_img.setAttribute("title", `${logo.name}`);
    logo_img.setAttribute("alt", `${logo.name} Logo`);

    logo_set.appendChild(logo_over_bg);
    logo_set.appendChild(logo_img);

    uni_logo_container.appendChild(logo_set);
  });
  setAffiliatedUniTransX();
});

window.addEventListener("resize", () => {
  setAffiliatedUniTransX();
});

function setAffiliatedUniTransX() {
  uni_logo_container.style.setProperty(
    "--logo-width-translate",
    -(
      150 +
      uni_logo_container.getBoundingClientRect().width -
      page.getBoundingClientRect().width
    ) + "px"
  );
}
