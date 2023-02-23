import { getElement, getElements } from "./util-fx.js";

// SIGNUP

const signup_form = getElement("#user-signup-form");
const signup_name_input = [
  getElement("#user-signup-first-name"),
  getElement("#user-signup-last-name"),
];

const signup_username_input = getElement("#user-signup-username");
const signup_password_input = getElement("#user-signup-password");
const signup_re_password_input = getElement("#user-signup-repeat-password");

const checkInputName = (e) => {
  const input = e.target;
  const name_pattern = new RegExp("[a-z]|\\s", "gi");

  if (
    input.value.match(name_pattern) === null ||
    input.value.match(name_pattern).length !== input.value.length
  ) {
    input.setCustomValidity(
      'A name must only contain characters in lowercase or uppercase, and spaces: eg. "Mark Lester", "de Guzman"'
    );
  } else {
    input.setCustomValidity("");
  }
};

const checkSignupInputUsername = (e) => {
  const input = e.target;
  const username_pattern = new RegExp("\\w", "gi");
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const accounts_user_names = accounts.map((account) => account.user_name);

  if (
    input.value.match(username_pattern) === null ||
    input.value.match(username_pattern).length !== input.value.length
  ) {
    input.setCustomValidity(
      'A name must only contain characters in lowercase or uppercase, numbers, and underscore: eg. "userName_01"'
    );
  } else if (accounts_user_names.includes(input.value)) {
    input.setCustomValidity("This username has already been taken.");
  } else {
    input.setCustomValidity("");
  }
};

const checkSignupInputPassword = (e) => {
  const input = e.target;
  const password_pattern = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    "g"
  );

  if (!input.value.match(password_pattern)) {
    input.setCustomValidity(
      'A password must be have eight (8) characters, and contains characters in lowercase or uppercase, special characters, and numbers: eg. "p@ssWord01"'
    );
  } else {
    input.setCustomValidity("");
  }
};

const checkSignupInputRePassword = (e) => {
  const input = e.target;

  if (input.value !== signup_password_input.value) {
    input.setCustomValidity(
      'This password is not the same as the same as above."'
    );
  } else {
    input.setCustomValidity("");
  }
};

window.addEventListener("load", (e) => {
  signup_form.querySelectorAll("input").forEach((input) => {
    input.value = null;
  });
  login_form.querySelectorAll("input").forEach((input) => {
    input.value = null;
  });
});

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const accounts = JSON.parse(localStorage.getItem("accounts"));
  let inputs = [];
  let new_account = {};
  getElements("#user-signup-form input").forEach((input) => {
    inputs = [...inputs, input.value];

    new_account = {
      id: `${crypto.randomUUID()}`,
      first_name: `${inputs[0]}`,
      last_name: `${inputs[1]}`,
      user_name: `${inputs[2]}`,
      password: `${inputs[3]}`,
      kart: [],
      likes: [],
    };
  });

  accounts.push(new_account);
  localStorage.setItem("accounts", JSON.stringify(accounts));

  window.location.reload();
});

signup_name_input.forEach((input) => {
  input.addEventListener("change", checkInputName);
  input.addEventListener("input", checkInputName);
});

signup_username_input.addEventListener("change", checkSignupInputUsername);
signup_username_input.addEventListener("input", checkSignupInputUsername);

signup_password_input.addEventListener("change", checkSignupInputPassword);
signup_password_input.addEventListener("input", checkSignupInputPassword);

signup_re_password_input.addEventListener("change", checkSignupInputRePassword);
signup_re_password_input.addEventListener("input", checkSignupInputRePassword);

// LOGIN

const login_form = getElement("#user-login-form");
const login_user_name = getElement("#user-login-username");
const login_password = getElement("#user-login-password");

const getLoginInput = (login_user_name) => {
  return JSON.parse(localStorage.getItem("accounts")).find((account) => {
    if (account.user_name === login_user_name.value) return account;
  });
};

const checkLoginInputUsername = (e) => {
  const login_user_name = e.target;
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const accounts_user_names = accounts.map((account) => account.user_name);

  if (accounts_user_names.includes(login_user_name.value)) {
    login_user_name.setCustomValidity("");
  } else if (!login_user_name.value) {
    login_user_name.setCustomValidity("Please fill out this field.");
  } else {
    login_user_name.setCustomValidity("Username does not exist.");
  }
};

const checkLoginInputPassword = (e) => {
  const login_password = e.target;
  const login_user_name = getElement("#user-login-username");

  const account_password = getLoginInput(login_user_name)
    ? getLoginInput(login_user_name).password
    : null;

  if (!account_password) {
    login_user_name.setCustomValidity("Username does not exist.");
  } else {
    login_user_name.setCustomValidity("");
    const login_success = checkLoginInputPasswordSuccess(
      login_password,
      account_password
    );

    if (login_success) {
      login_password.setCustomValidity("");
      // window.location.reload();
    } else {
      login_password.setCustomValidity("Wrong Password.");
    }
  }
};

const checkLoginInputPasswordSuccess = (login_password, account_password) => {
  let login_success = false;
  if (login_password.value === account_password) {
    login_success = true;
  }
  return login_success;
};

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input_values = [...getElements("#user-login-form input")].map(
    (input) => input.value
  );

  localStorage.setItem("logged_account", input_values[0]);
  window.location.reload();
});

login_user_name.addEventListener("change", checkLoginInputUsername);
login_user_name.addEventListener("input", checkLoginInputUsername);

login_password.addEventListener("change", checkLoginInputPassword);
login_password.addEventListener("input", checkLoginInputPassword);

// LOGOUT

const logout_form = getElement("#user-logout-form");

logout_form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("logged_account", "");
  window.location.reload();
});

window.addEventListener("DOMContentLoaded", (e) => {
  const user_option_unlogged_i = getElement(
    ".show-user-options-btn .fa-user-large-slash"
  );
  const user_option_logged_i = getElement(".show-user-options-btn .fa-user");
  const login_inputs = [...getElements("#user-login-form input")];

  if (localStorage.getItem("logged_account")) {
    login_inputs.forEach((input) => {
      input.setAttribute("disabled", "true");
    });
    user_option_unlogged_i.style.setProperty("display", "none");
    user_option_logged_i.style.setProperty("display", "block");

    login_form.style.setProperty("display", "none");
    logout_form.style.setProperty("display", "grid");
    signup_form.style.setProperty("display", "none");
  } else {
    login_inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
    user_option_unlogged_i.style.setProperty("display", "block");
    user_option_logged_i.style.setProperty("display", "none");

    login_form.style.setProperty("display", "grid");
    logout_form.style.setProperty("display", "none");
    signup_form.style.setProperty("display", "grid");
  }
});
