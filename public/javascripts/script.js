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

const totalPurchased = document.getElementById("total_purchased");
const sellingPrice = document.getElementById("product_selling_price_ref");
const quantityOrdered = document.getElementById("quantity_ordered");

function totalPurchasedValue() {
  totalPurchased.value =
    Number(sellingPrice.value) * Number(quantityOrdered.value);
}

window.addEventListener("load", () => {
  const materialSymbols = document.querySelectorAll(
    ".material-symbols-outlined"
  );
  materialSymbols.forEach((symbol) => {
    symbol.style.cssText = "opacity:1";
  });
});

let deleteData = document.querySelector(".customerData");
if (deleteData) {
  deleteData.addEventListener("click", () => {
    url = `/customer/${deleteData.dataset.id}/delete`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err));
  });
}

let deleteProducts = document.querySelectorAll("button.productID");
if (deleteProducts) {
  deleteProducts.forEach((product) => {
    product.addEventListener("click", () => {
      url = `/weekly_products/${product.dataset.productid}`;
      fetch(url, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      })
        .then((response) => {
          console.log(response.json());
          response.json();
        })
        .then((data) => (window.location.href = data.redirect))
        .catch((err) => console.log(err));
    });
  });
}
