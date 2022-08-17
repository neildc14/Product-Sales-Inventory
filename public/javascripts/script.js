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

(function deleteCustomers() {
  let deleteCustomers = document.querySelectorAll("button.customerID");
  deleteCustomers.forEach((customer) => {
    customer.addEventListener("click", () => {
      let url = customer.dataset.customerid;
      let redirect = "";
      FetchToDelete(url, redirect);
    });
  });
})()(function deleteProducts() {
  let deleteProducts = document.querySelectorAll("button.productID");
  deleteProducts.forEach((product) => {
    product.addEventListener("click", () => {
      let url = product.dataset.productid;
      let redirect = "/weekly_products";
      FetchToDelete(url, redirect);
    });
  });
})()(function historyDeleteProducts() {
  let deleteProducts = document.querySelectorAll("button.historyproductID");
  deleteProducts.forEach((product) => {
    product.addEventListener("click", () => {
      let url = product.dataset.productid;
      let redirect = product.dataset.salesweekid;
      FetchToDelete(url, redirect);
    });
  });
})()(function deleteMiscellaneous() {
  let deleteMisc = document.querySelectorAll("button.miscID");
  deleteMisc.forEach((misc) => {
    misc.addEventListener("click", () => {
      let url = misc.dataset.miscid;
      let redirect = "/weekly_products";
      FetchToDelete(url, redirect);
    });
  });
})()(function historyDeleteMiscellaneous() {
  let deleteMisc = document.querySelectorAll("button.HisMiscID");
  deleteMisc.forEach((misc) => {
    misc.addEventListener("click", () => {
      let url = misc.dataset.miscid;
      let redirect = misc.dataset.salesweekid;
      FetchToDelete(url, redirect);
    });
  });
})()(function deleteSalesWeek() {
  let deleteSalesWeek = document.querySelectorAll("button.salesweekID");
  deleteSalesWeek.forEach((week) => {
    week.addEventListener("click", () => {
      let url = week.dataset.salesweekid;
      let redirect = "/sales_history";
      FetchToDelete(url, redirect);
    });
  });
})();

function FetchToDelete(url, redirect) {
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect || redirect))
    .catch((err) => console.log(err));
}
