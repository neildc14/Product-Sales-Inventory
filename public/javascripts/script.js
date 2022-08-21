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
