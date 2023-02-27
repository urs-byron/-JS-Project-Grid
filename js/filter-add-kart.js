import { getElement } from "./util-fx.js";

// RETURNS CURRENT LOGGED ACCOUNT INDEX FROM THE SET OF LOCALSTORAGE ACCOUNTS
const getLoggedAccountIndex = () => {
  const accounts = JSON.parse(localStorage.getItem("eh_music_shop_accounts"));
  const logged_account = localStorage.getItem("eh_music_shop_logged_account");

  let logged_account_i = null;

  accounts.forEach((account, index) => {
    if (account.user_name === logged_account) logged_account_i = index;
  });

  return logged_account_i;
};

// ADDS A NEW PRODUCT TO AN ACCOUNT'S KART
const newKartItem = (
  accounts,
  logged_account_i,
  item_model,
  item_img,
  item_price
) => {
  const new_kart_item = {
    model: item_model,
    price: item_price,
    img: item_img,
    quantity: 1,
  };
  accounts[logged_account_i].kart.push(new_kart_item);
};

// SHOWS KART ADDING ANIMATION
const addKartItemAnim = (e) => {
  const logged_account = localStorage.getItem("eh_music_shop_logged_account");
  if (logged_account) {
    // ANIMATION
    e.currentTarget.classList.add("show-add-kart-anim");
    setTimeout(
      (e) => {
        let el = null;
        if (e.target.classList.contains("fa-solid")) {
          el = e.target.parentElement;
        } else if (e.target.classList.contains("product-add-kart")) {
          el = e.target;
        }
        el.classList.remove("show-add-kart-anim");
      },
      4000,
      e
    );
  }
};

// ADDS A PRODUCT TO AN ACCOUNT'S KART
const addKartItemQtty = (e) => {
  const logged_account = localStorage.getItem("eh_music_shop_logged_account");
  if (logged_account) {
    // DATABASE
    const item_model = e.currentTarget.dataset.model;
    const item_img = e.currentTarget.dataset.imgSrc;
    const item_price = e.currentTarget.dataset.price;

    const accounts = JSON.parse(localStorage.getItem("eh_music_shop_accounts"));
    const logged_account_i = getLoggedAccountIndex();
    let logged_account_kart_item_names = [];
    let logged_account_kart_item_model = null;

    logged_account_kart_item_names = accounts[logged_account_i].kart.map(
      (item) => item.model
    );

    if (logged_account_kart_item_names.length) {
      logged_account_kart_item_names.forEach((model, index) => {
        if (model === item_model) logged_account_kart_item_model = index;
      });

      if (
        logged_account_kart_item_model ||
        logged_account_kart_item_model === 0
      ) {
        accounts[logged_account_i].kart[logged_account_kart_item_model]
          .quantity++;
      } else {
        newKartItem(
          accounts,
          logged_account_i,
          item_model,
          item_img,
          item_price
        );
      }
    } else {
      newKartItem(accounts, logged_account_i, item_model, item_img, item_price);
    }

    localStorage.setItem("eh_music_shop_accounts", JSON.stringify(accounts));
  }
};

export { getLoggedAccountIndex, addKartItemAnim, addKartItemQtty };
