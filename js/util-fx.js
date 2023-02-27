// RETURNS A SINGLE HTML OBJECT
const getElement = (mark) => {
  const element = document.querySelector(mark);
  if (element === null) {
    throw new Error("Element with that class/id does not exist");
  }
  return element;
};

// RETURNS A SET SINGLE HTML OBJECT
const getElements = (mark) => {
  const element = document.querySelectorAll(mark);
  if (element === null) {
    throw new Error("Element with that class/id does not exist");
  }
  return element;
};

// RETURNS ASYNC DATA FROM A GIVEN SITE
const getData = async (url_param) => {
  let res = {};
  if (
    window.location.origin !== "https://sensational-llama-e030d4.netlify.app"
  ) {
    res = await fetch(
      `http://127.0.0.1:5500/01_personal_project/P_Site_Grid${url_param}`
    );
  } else {
    res = await fetch(
      `https://sensational-llama-e030d4.netlify.app${url_param}`
    );
  }
  const data = await res.json();
  return data;
};

// RETURNS A CSS VARIABLE
const getCSSVar = (e, mark) => {
  return getComputedStyle(e).getPropertyValue(mark);
};

// HIDES A PAGE PRELOADER
const hidePreLoader = () => {
  getElement(".preloader").classList.add("hide-preloader");
};

// CREATES LOCALSTORAGE FOR THE SITE
const createLocalStorage = () => {
  if (!localStorage.getItem("eh_music_shop_accounts")) {
    localStorage.setItem("eh_music_shop_accounts", JSON.stringify([]));
  }
  if (!localStorage.getItem("eh_music_shop_logged_account")) {
    localStorage.setItem("eh_music_shop_logged_account", "");
  }
};

export {
  getElement,
  getElements,
  getData,
  getCSSVar,
  hidePreLoader,
  createLocalStorage,
};
