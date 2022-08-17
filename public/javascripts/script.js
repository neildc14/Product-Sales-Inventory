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
  console.log(totalPurchased.value);
}

window.addEventListener("load", () => {
  const materialSymbols = document.querySelectorAll(
    ".material-symbols-outlined"
  );
  materialSymbols.forEach((symbol) => {
    symbol.style.cssText = "opacity:1";
  });
});

function deleteCustomers() {
  let deleteCustomers = document.querySelectorAll("button.customerID");
  deleteCustomers.forEach((customer) => {
    customer.addEventListener("click", () => {
      let url = customer.dataset.customerid;
      let redirect = "";
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
deleteCustomers();

function deleteProducts() {
  let deleteProducts = document.querySelectorAll("button.productID");
  deleteProducts.forEach((product) => {
    product.addEventListener("click", () => {
      let url = product.dataset.productid;
      let redirect = "/weekly_products";
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
deleteProducts();

function historyDeleteProducts() {
  let deleteProducts = document.querySelectorAll("button.historyproductID");
  deleteProducts.forEach((product) => {
    product.addEventListener("click", () => {
      let url = product.dataset.productid;
      let redirect = product.dataset.salesweekid;
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
historyDeleteProducts();

function deleteMiscellaneous() {
  let deleteMisc = document.querySelectorAll("button.miscID");
  deleteMisc.forEach((misc) => {
    misc.addEventListener("click", () => {
      let url = misc.dataset.miscid;
      let redirect = "/weekly_products";
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
deleteMiscellaneous();

function historyDeleteMiscellaneous() {
  let deleteMisc = document.querySelectorAll("button.HisMiscID");
  deleteMisc.forEach((misc) => {
    misc.addEventListener("click", () => {
      let url = misc.dataset.miscid;
      let redirect = misc.dataset.salesweekid;
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
historyDeleteMiscellaneous();

function deleteSalesWeek() {
  let deleteSalesWeek = document.querySelectorAll("button.salesweekID");
  deleteSalesWeek.forEach((week) => {
    week.addEventListener("click", () => {
      let url = week.dataset.salesweekid;
      let redirect = "/sales_history";
      const METHOD = "DELETE";
      FetchToDelete(url, redirect, METHOD);
    });
  });
}
deleteSalesWeek();

const FetchToDelete = (url, redirect, METHOD) => {
  fetch(url, {
    method: METHOD,
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect || redirect))
    .catch((err) => console.log(err));
};

/*edit */
function editCustomer() {
  let customerForm = document.querySelector('[name="customerEditForm"]');
  customerForm.addEventListener("submit", () => {
    let customer_id = customerForm["customer_id"].value;
    let product_ordered = customerForm["product_ordered"].value;
    let weekly_product = customerForm["weekly_product"].value;
    let customer_name = customerForm["customer_name"].value;
    let address = customerForm["address"].value;
    let quantity_ordered = customerForm["quantity_ordered"].value;
    let total_purchased = customerForm["total_purchased"].value;

    const customerData = {
      id: customer_id,
      product_ordered: product_ordered,
      weekly_product: weekly_product,
      customer_name: customer_name,
      address: address,
      quantity_ordered: quantity_ordered,
      total_purchased: total_purchased,
    };

    url = customerForm.dataset.customerurl;
    redirect = customerForm.dataset.customerurl;
    FetchToEdit(url, customerData, redirect);
  });
}
editCustomer();

const FetchToEdit = (url, data, redirect) => {
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then(() => (window.location.href = data.redirect || redirect))
    .catch((err) => {
      console.log(err);
    });
};
