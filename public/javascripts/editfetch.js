/*edit */
function editCustomer() {
  let customerForm = document.querySelector('[name="customerEditForm"]');
  if (customerForm) {
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

      let url = customerForm.dataset.customerurl;
      let redirect = customerForm.dataset.customerurl;
      FetchToEdit(url, customerData, redirect);
    });
  }
}
editCustomer();

function editProduct() {
  let productForm = document.querySelector('[name="productEditForm"]');
  let currentUrl = window.location.href;
  let redirect;
  if (productForm) {
    productForm.addEventListener("submit", () => {
      let product_id = productForm.dataset.productid;
      let weekly_product = productForm["weekly_product"].value;
      let product_name = productForm["product_name"].value;
      let quantity = productForm["quantity"].value;
      let original_price = productForm["original_price"].value;
      let selling_price = productForm["selling_price"].value;

      let productData = {
        product_id: product_id,
        weekly_product: weekly_product,
        product_name: product_name,
        quantity: quantity,
        original_price: original_price,
        selling_price: selling_price,
      };

      let url = `/weekly_products/${product_id}`;

      if (currentUrl.includes("/weekly_products")) {
        redirect += "/weekly_products";
      } else if (!currentUrl.includes("/weekly_products")) {
        redirect += `/sales_history/${weekly_product}`;
      }

      FetchToEdit(url, productData, redirect);
    });
  }
}
editProduct();

function editWeekSales() {
  let weekSalesForm = document.querySelectorAll('[name="salesEditForm"]');
  if (weekSalesForm) {
    weekSalesForm.forEach((week) => {
      let id = week.dataset.salesweekid;
      let date_started = week["date_start"];
      let date_ended = week["date_end"];

      dateConversion(date_started.dataset.datestart, date_started);
      dateConversion(date_ended.dataset.dateend, date_ended);

      week.addEventListener("submit", (e) => {
        let weeklySalesData = {
          id: id,
          date_start: new Date(date_started.value),
          date_end: new Date(date_ended.value),
        };
        console.log(weeklySalesData);

        let url = week.dataset.salesweekurl;
        let redirect = "/sales_history";
        console.log(url);
        FetchToEdit(url, weeklySalesData, redirect);
      });
    });
  }
}

editWeekSales();

function dateConversion(inputDate, outputValue) {
  let convertedDate = new Date(inputDate);
  if (isNaN(convertedDate)) return (outputValue.value = "");

  let month = convertedDate.getMonth() + 1;
  if (month < 10) {
    month = `0${convertedDate.getMonth() + 1}`;
  }

  let date = convertedDate.getDate();
  if (date < 10) {
    date = `0${convertedDate.getDate()}`;
  }

  let date_formatted = `${convertedDate.getFullYear()}-${month}-${date}`;
  outputValue.value = date_formatted;
}

function editExpenses() {
  let expensesEditForm = document.querySelectorAll('[name="expensesEditForm"]');
  if (expensesEditForm) {
    let currentUrl = window.location.href;
    let redirect;
    expensesEditForm.forEach((expenses) => {
      expenses.addEventListener("submit", () => {
        let id = expenses.dataset.miscid;
        let weekly_product_misc = expenses["weekly_product_misc"].value;
        let misc_name = expenses["misc_name"].value;
        let amount = expenses["amount"].value;

        let expensesData = {
          id: id,
          weekly_product_misc: weekly_product_misc,
          misc_name: misc_name,
          amount: amount,
        };
        console.log(expensesData);
        let url = expenses.dataset.miscurl;

        if (currentUrl.includes("/weekly_products")) {
          redirect += "/weekly_products";
        } else if (!currentUrl.includes("/weekly_products")) {
          redirect += `/sales_history/${weekly_product}`;
        }

        FetchToEdit(url, expensesData, redirect);
      });
    });
  }
}
editExpenses();

const FetchToEdit = (url, updatedData, redirect) => {
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ updatedData }),
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect || redirect))
    .catch((err) => {
      console.log(err);
    });
};
