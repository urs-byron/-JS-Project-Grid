import { getElement, getElements } from "../util-fx.js";

// ASSIGN PAGE

getElements(".public-nav-page-assign-btn").forEach((assign_btn) => {
  const assign_btn_link = assign_btn.children[0].getAttribute("href").slice(2);
  assign_btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (window.location.origin === "http://127.0.0.1:5500") {
      if (
        window.location.pathname !==
        `/01_personal_project/P_Site_Grid/${assign_btn_link}`
      ) {
        window.location.assign(
          `http://127.0.0.1:5500/01_personal_project/P_Site_Grid/${assign_btn_link}`
        );
      }
    } else if (
      window.location.origin === "https://sensational-llama-e030d4.netlify.app"
    ) {
      if (window.location.pathname !== `/${assign_btn_link}`) {
        console.log(1);
        console.log(assign_btn_link);
        window.location.assign(
          `https://sensational-llama-e030d4.netlify.app/${assign_btn_link}`
        );
      }
    }
  });
});

// TOGGLE PRIMARY NAVI

const primary_menu = getElement(".primary-list");
const not_small_mob_mq = window.matchMedia("(min-width:415px");

not_small_mob_mq.addEventListener("change", (event) => {
  if (event.matches) {
    set_primary_li_height();
  } else {
    const secondary_uls = [...getElements(".primary-list .secondary-ul")];

    secondary_uls.forEach((ul) => {
      if (ul.classList.contains("show-secondary-list")) {
        const primary_ul_height = primary_menu.getBoundingClientRect().height;
        const primary_li_height =
          ul.parentElement.getBoundingClientRect().height;
        const secondary_li_height = [...ul.children].length * 31;

        primary_menu.style.height = `${
          primary_ul_height + secondary_li_height
        }px`;
        ul.parentElement.style.height = `${
          primary_li_height + secondary_li_height
        }px`;
      }
    });
  }
});

getElement(".primary-list-hover").addEventListener("click", function (element) {
  try {
    if (element.target.classList.contains("primary-list-hover")) {
      set_primary_li_height();
      hidePrimaryFx();
    }
  } catch (err) {
    throw new Error(err);
  }
});

[...primary_menu.children].forEach((primary_menu_li) => {
  primary_menu_li.addEventListener("click", function (element) {
    try {
      set_primary_li_height();

      primary_menu.style.height = `302px`;
      if (element.currentTarget.getElementsByTagName("ul").length) {
        const target_secondary_list =
          element.currentTarget.querySelector(".secondary-ul");

        target_secondary_list.classList.toggle("show-secondary-list");

        if (window.innerWidth <= 414) {
          const primary_list_height =
            primary_menu.getBoundingClientRect().height;
          const primary_list_li_height =
            target_secondary_list.parentElement.getBoundingClientRect().height;
          const secondary_list_height =
            target_secondary_list.children.length * 31 - 16;
          if (target_secondary_list.classList.contains("show-secondary-list")) {
            primary_menu.style.height = `${
              primary_list_height + secondary_list_height
            }px`;
            target_secondary_list.parentElement.style.height = `${
              primary_list_li_height + secondary_list_height
            }px`;
          } else {
            target_secondary_list.parentElement.style.height = `60px`;
          }
        }
      }
      hideSecondaryFx(element.currentTarget);
    } catch (err) {
      throw new Error(err);
    }
  });
});

function hideSecondaryFx(e) {
  getElements(".secondary-ul").forEach((secondary_ul) => {
    if (secondary_ul !== e.querySelector(".secondary-ul")) {
      secondary_ul.classList.remove("show-secondary-list");
      secondary_ul.parentElement.classList.remove("expand-primary-li");
    }
  });
}

function set_primary_li_height() {
  primary_menu.style.height = "300px";
  [...primary_menu.children].forEach((menu_li) => {
    menu_li.style.height = "60px";
  });
}

function hidePrimaryFx() {
  primary_menu.classList.toggle("show-primary-list");
  hideSecondaryFx(getElement(".primary-list a"));
}

// TOGGLE SUPPORT WINDOW

getElement(".support-btn").addEventListener("click", function (element) {
  try {
    getElement(".support-window").classList.toggle("show-support-window");
  } catch (err) {
    throw new Error(err);
  }
});
