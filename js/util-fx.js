const getElement = (mark) => {
  const element = document.querySelector(mark);
  if (element === null) {
    throw new Error("Element with that class/id does not exist");
  }
  return element;
};

const getElements = (mark) => {
  const element = document.querySelectorAll(mark);
  if (element === null) {
    throw new Error("Element with that class/id does not exist");
  }
  return element;
};

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

const getCSSVar = (e, mark) => {
  return getComputedStyle(e).getPropertyValue(mark);
};

export { getElement, getElements, getData, getCSSVar };
