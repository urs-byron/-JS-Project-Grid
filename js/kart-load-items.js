import { getElement } from "./util-fx.js";
import { getLoggedAccountIndex } from "./filter-add-kart.js";

// HTML MESSAGE WHEN THE ACCOUNT IS EMPTY
const emptyAccntKartMsg = () => {
  const kart_items_content = getElement(".kart-items-content-container");

  const no_account_kart_head = document.createElement("h3");

  no_account_kart_head.appendChild(
    document.createTextNode(`Your kart is empty!`)
  );
  no_account_kart_head.classList.add("kart-no-accnt");
  kart_items_content.appendChild(no_account_kart_head);
};

// GENERATES HTML CONTENT FOR THE KART
const loadKartItems = () => {
  const logged_account_i = getLoggedAccountIndex();
  const kart_items_content = getElement(".kart-items-content-container");
  getElement(
    ".kart-items-content-container .gen-loading-container"
  ).classList.add("hide-gen-loading");

  if (logged_account_i !== null) {
    const accounts = JSON.parse(localStorage.getItem("eh_music_shop_accounts"));
    const account_kart = accounts[logged_account_i].kart;
    if (account_kart.length > 0) {
      account_kart.forEach((item, index, arr) => {
        const kart_item = document.createElement("div");
        kart_item.classList.add("kart-item");

        const kart_item_del_i = document.createElement("i");
        kart_item_del_i.classList.add("fa-solid", "fa-trash");
        const kart_item_del = document.createElement("div");
        kart_item_del.classList.add("kart-item-delete");
        kart_item_del.appendChild(kart_item_del_i);
        kart_item_del.setAttribute("data-kart-index", index);
        kart_item_del.addEventListener("click", removeKartItem);

        const kart_item_img = document.createElement("img");
        kart_item_img.setAttribute("src", `${item.img}`);
        kart_item_img.setAttribute("alt", `${item.model}`);
        kart_item_img.setAttribute("title", `${item.model}`);
        const kart_item_img_cont = document.createElement("div");
        kart_item_img_cont.classList.add("kart-item-img");
        kart_item_img_cont.appendChild(kart_item_img);

        const kart_item_model = document.createElement("h3");
        const kart_item_price = document.createElement("h3");
        const kart_item_model_text = document.createTextNode(
          `Model ${item.model}`
        );
        const kart_item_price_text = document.createTextNode(
          `\$ ${item.price}`
        );
        kart_item_model.appendChild(kart_item_model_text);
        kart_item_price.appendChild(kart_item_price_text);
        const kart_item_label = document.createElement("a");
        kart_item_label.classList.add("kart-item-label");
        kart_item_label.setAttribute(
          "href",
          `./model.html?product-model=${item.model}`
        );
        kart_item_label.appendChild(kart_item_model);
        kart_item_label.appendChild(kart_item_price);

        const kart_item_minus = document.createElement("i");
        kart_item_minus.classList.add("fa-solid", "fa-square-minus");

        const kart_item_qtty = document.createElement("span");
        const kart_item_qtty_text = document.createTextNode(item.quantity);
        kart_item_qtty.appendChild(kart_item_qtty_text);
        const kart_item_plus = document.createElement("i");
        kart_item_plus.classList.add("fa-solid", "fa-square-plus");
        const kart_item_qtty_cont = document.createElement("div");
        kart_item_qtty_cont.classList.add("kart-item-qtty");
        kart_item_qtty_cont.setAttribute("data-kart-index", index);
        kart_item_qtty_cont.appendChild(kart_item_minus);
        kart_item_qtty_cont.appendChild(kart_item_qtty);
        kart_item_qtty_cont.appendChild(kart_item_plus);
        kart_item_qtty_cont.addEventListener("click", changeKartItemQtty);

        const kart_item_cont = document.createElement("div");
        kart_item_cont.classList.add("kart-item-container");
        kart_item.appendChild(kart_item_cont);

        kart_item_cont.appendChild(kart_item_del);
        kart_item_cont.appendChild(kart_item_img_cont);
        kart_item_cont.appendChild(kart_item_label);
        kart_item_cont.appendChild(kart_item_qtty_cont);

        kart_items_content.appendChild(kart_item);
      });
    } else {
      emptyAccntKartMsg();
    }
  } else {
    const no_account_head = document.createElement("h3");
    no_account_head.appendChild(
      document.createTextNode(`Login to see your kart!`)
    );
    no_account_head.classList.add("kart-no-accnt");
    kart_items_content.appendChild(no_account_head);
  }
};

// CHANGES THE DATASET OF THE PROCEEDING HTML CONTENT FROM THE DELETED KART ITEM
const changeKartItemData = (e) => {
  const del_item = e.currentTarget.parentElement.parentElement;
  del_item.style.setProperty("display", "none");

  let del_item_next = del_item.nextElementSibling;

  while (del_item_next !== null) {
    del_item_next.children[0].firstChild.dataset.kartIndex--;
    del_item_next.children[0].lastChild.dataset.kartIndex--;
    del_item_next = del_item_next.nextElementSibling;
  }

  const logged_account_i = getLoggedAccountIndex();
  const accounts = [
    ...JSON.parse(localStorage.getItem("eh_music_shop_accounts")),
  ];
  const account_kart = accounts[logged_account_i].kart;
  --account_kart.length;
  if (account_kart.length === 0) emptyAccntKartMsg();
};

// CHANGES A KART ITEM'S QUANTITY BOTH IN DISPLAY AND LOCALSTORAGE
const changeKartItemQtty = (e) => {
  if (
    e.target.classList.contains("fa-square-minus") ||
    e.target.classList.contains("fa-square-plus")
  ) {
    const accounts = JSON.parse(localStorage.getItem("eh_music_shop_accounts"));
    const account_kart = accounts[getLoggedAccountIndex()].kart;
    const model = account_kart[e.currentTarget.dataset.kartIndex];
    let newmodel_qtty = null;

    if (e.target.classList.contains("fa-square-minus")) {
      newmodel_qtty = --model.quantity;

      if (newmodel_qtty > 0) {
        e.currentTarget.querySelector("span").textContent = newmodel_qtty;
        localStorage.setItem(
          "eh_music_shop_accounts",
          JSON.stringify(accounts)
        );
      } else {
        account_kart.splice(e.currentTarget.dataset.kartIndex, 1);

        changeKartItemData(e);

        localStorage.setItem(
          "eh_music_shop_accounts",
          JSON.stringify(accounts)
        );
      }
    } else if (e.target.classList.contains("fa-square-plus")) {
      newmodel_qtty = ++model.quantity;
      e.currentTarget.querySelector("span").textContent = newmodel_qtty;
      localStorage.setItem("eh_music_shop_accounts", JSON.stringify(accounts));
    }
  }
};

// DELETES A KART ITEM FROM LOCALSTORAGE
const removeKartItem = (e) => {
  const accounts = JSON.parse(localStorage.getItem("eh_music_shop_accounts"));
  const account_kart = accounts[getLoggedAccountIndex()].kart;
  const kart_model_i = e.currentTarget.dataset.kartIndex;
  account_kart.splice(kart_model_i, 1);

  changeKartItemData(e);

  localStorage.setItem("eh_music_shop_accounts", JSON.stringify(accounts));
};

export { loadKartItems };
