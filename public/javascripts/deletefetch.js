function deleteCustomers() {
  let deleteCustomers = document.querySelectorAll("button.customerID");
  deleteCustomers.forEach((customer) => {
    customer.addEventListener("click", () => {
      let url = customer.dataset.customerid;
      let redirect = "";
      FetchToDelete(url, redirect);
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
      FetchToDelete(url, redirect);
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
      FetchToDelete(url, redirect);
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
      FetchToDelete(url, redirect);
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

      FetchToDelete(url, redirect);
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
      FetchToDelete(url, redirect);
    });
  });
}
deleteSalesWeek();

const FetchToDelete = (url, redirect) => {
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect || redirect))
    .catch((err) => console.log(err));
};
