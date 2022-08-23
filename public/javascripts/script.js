const topNav = document.getElementById("weekly_product_top_nav");

function navStickTopWhenScroll() {
  if (topNav) {
    window.addEventListener("scroll", function () {
      let scrollPosition = window.pageYOffset;
      if (scrollPosition > 0) {
        topNav.style.cssText = "top: 0vh";
      } else {
        topNav.style.cssText = "top: 10vh";
      }
    });
  }
}

navStickTopWhenScroll();

window.addEventListener("load", () => {
  const materialSymbols = document.querySelectorAll(
    ".material-symbols-outlined"
  );
  materialSymbols.forEach((symbol) => {
    symbol.style.cssText = "opacity:1";
  });
});

const totalPurchased = document.getElementById("total_purchased");
const sellingPrice = document.getElementById("product_selling_price_ref");
const quantityOrdered = document.getElementById("quantity_ordered");

function totalPurchasedValue() {
  totalPurchased.value =
    Number(sellingPrice.value) * Number(quantityOrdered.value);
}

let registerForm = document.querySelector('[name="registerForm"]');
if (registerForm) {
  let initial_password = registerForm["initial_password"];
  let validated_password = registerForm["validated_password"];
  function matchPassword() {
    if (initial_password.value !== validated_password.value) {
      validated_password.classList.add("is-invalid");
      return false;
    }
  }

  if (validated_password) {
    validated_password.addEventListener("input", () => {
      if (validated_password.classList.contains("is-invalid")) {
        validated_password.classList.remove("is-invalid");
      }
    });
  }
}

let limit_orders = document.querySelector(".limit_orders");
if (limit_orders) {
  let addCustomerForm = document.querySelector('[name="addCustomerForm"]');
  let addBtn = document.querySelector(".addCustomerBtn");
  let product_quantity = limit_orders.dataset.prodqty;
  let total_orders = limit_orders.dataset.totalorders;
  let quantity_ordered = addCustomerForm["quantity_ordered"];
  let available_supply = Number(product_quantity) - Number(total_orders);

  if (product_quantity !== "") {
    console.log(available_supply);
    function disableAddBtn() {
      if (
        Number(total_orders) === Number(product_quantity) ||
        Number(available_supply) === 0
      ) {
        addBtn.setAttribute("disabled", "disabled");
      }
    }
    disableAddBtn();
  }

  function limitQuantity() {
    if (
      Number(quantity_ordered.value) > Number(available_supply) &&
      product_quantity !== ""
    ) {
      quantity_ordered.classList.add("is-invalid");
      return false;
    } else {
      return totalPurchasedValue();
    }
  }

  if (quantity_ordered) {
    quantity_ordered.addEventListener("input", () => {
      if (quantity_ordered.classList.contains("is-invalid")) {
        quantity_ordered.classList.remove("is-invalid");
      }
    });
  }
}
