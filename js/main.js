// var item1 = new Product("001", "2022-11-22", "iPhone X", "Apple", "1300", "30", "Cabinet-10");
// var item2 = new Product("002", "2022-11-23", "Note 23", "Samsung", "1500", "6", "Cabinet-8");

var list = getDataList("team3");
list = [];
// setDataList(list, "team3");

// if (list.length == 0) {
//   list.push(item1);
//   list.push(item2);
//   setDataList(list, "team3");
// }
//<!-- INIT DISPLAY -->
$("#TotalTitle").hide();
$("#ShipButton").hide();

// Update list
ShowList(list);
function generateUniqueId() {
  // Generate a unique ID based on the current timestamp and a random number
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000); // Adjust as needed
  const uniqueId = `${timestamp}-${randomNum}`;

  return uniqueId;
}
//<!-- SHOW TABLE -->
function ShowList(list) {
  debugger;

  if (CurrentMode == AppMode.EXPORT_MODE) {
    $("#FilterStatusDropDownList").hide();
  } else {
    $("#FilterStatusDropDownList").show();
  }

  // table header
  var table = "";

  // make table body
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    table += "<tr><td class='text-center'>" + (i + 1);
    table += "</td><td>" + item.Date;
    table += "</td><td>" + item.Name;
    table += "</td><td>" + item.Maker;
    table += "</td><td class='text-center'>" + item.Price + "&nbsp;";
    if (parseInt(item.Amount) > 0) {
      table += "</td><td class='text-center'>For Sale</td>";
    } else {
      table += "</td><td class='text-center'>Run Out</td>";
    }
    table += "</td><td class='text-center'>" + item.Amount + "&nbsp;";
    table += "</td><td class='text-center'>" + item.Location + "&nbsp;";
    if (CurrentMode == AppMode.EXPORT_MODE) {
      table +=
        "<td class='text-center'><button class='btn btn-danger' onclick=\"deleteProduct('" +
        item.Id +
        "')\">Cancel</button>&nbsp;</tr>";
    } else {
      table +=
        "<td class='text-center'><button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#AddEditPopup' onclick=\"editProduct('" +
        item.Id +
        "')\">Edit</button>&nbsp;<button class='btn btn-danger' onclick=\"deleteProduct('" +
        item.Id +
        "')\">Delete</button>&nbsp;<button class='btn btn-success' data-bs-toggle='modal' data-bs-target='#AddEditPopup' onclick=\"exportProduct('" +
        item.Id +
        "')\">Export</button>&nbsp;</td></tr>";
    }
  }

  // update table
  $("#TableList").html(table);
}

//<!-- SHOW DIALOG -->
function ShowPopup(item) {
  // debugger;
  // resut title color
  $("#panel-header").removeClass("bg-primary");
  $("#panel-header").removeClass("bg-success");
  $("#panel-header").removeClass("bg-warning");

  // reset button color
  $("#SaveButton").removeClass("btn-primary");
  $("#SaveButton").removeClass("btn-success");
  $("#SaveButton").removeClass("btn-warning");

  // set popup title
  if (CurrentMode == AppMode.EDIT_MODE) {
    $("#PanelTitle").html("Edit products");
    $("#SaveButton").html("Update");
    $("#SaveButton").addClass("btn-warning");
    $("#panel-header").addClass("bg-warning");
  } else if (CurrentMode == AppMode.EXPORT_MODE) {
    $("#PanelTitle").html("Export products");
    $("#SaveButton").html("Export");
    $("#SaveButton").addClass("btn-success");
    $("#panel-header").addClass("bg-success");
  } else if (CurrentMode == AppMode.ADD_MODE) {
    $("#PanelTitle").html("Import more products");
    $("#SaveButton").html("Import");
    $("#SaveButton").addClass("btn-primary");
    $("#panel-header").addClass("bg-primary");
  }

  if (item != null) {
    // set edit Id
    $("#_id").val(item.Id);

    //  set data
    $("#date").val(item.Date);
    $("#name").val(item.Name);
    $("#maker").val(item.Maker);
    $("#price").val(item.Price);
    $("#amount").val(item.Amount);
    $("#location").val(item.Location);
  } else {
    // set edit Id
    $("#_id").val("");

    //  set data
    $("#date").val(GetTodayWithFormat());
    $("#name").val("");
    $("#maker").val("");
    $("#price").val("");
    $("#amount").val("");
    $("#location").val("");
  }
}

function generateUniqueId() {
  return Date.now().toString();
}

function GetTodayWithFormat() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
}

function calculateTotalAmount(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += parseInt(list[i].Amount*list[i].Price);
  }
  return total;
}

// Update the total amount and replace the content of "TotalValue"
function updateTotalAmount(list) {
  const totalAmount = calculateTotalAmount(list);
  $("#TotalValue").text(totalAmount); // Update the content of the element with id "TotalValue"
}

function filterByStatus(selectedStatus) {
  // Filter the products based on the selected status
  let filteredList = [];
  if (selectedStatus === "-1") {
    // If "All" is selected, show all products
    filteredList = list;
  } else {
    // Otherwise, filter by the selected status (For Sale or Run Out)
    filteredList = list.filter((item) => {
      if (selectedStatus === "1") {
        return Number(item.Amount) > 0;
      } else {
        return Number(item.Amount) === 0;
      }
    });
  }

  // Update the table to display the filtered list
  ShowList(filteredList);
}
//<!-- ACTIONS -->
// [Exercise 1] Import Action
$("#ImportButton").click(function (e) {
  e.preventDefault();
  // debugger;

  CurrentMode = AppMode.ADD_MODE;
  ShowPopup();
  // alert("You must implement this function [Exercise 1]");
});
function changeExistedItem(name, maker, price, amount, location) {
  var list = getDataList("team3");
  const founded = list.forEach(element => {
    if (element.Name == name && element.Maker == maker && element.Price == price && element.Location == location) {
      element.amount = amount
      return element;
    }
  });
  return founded;
}
// [Exercise 2] Save Action
$("#SaveButton").click(function (e) {
  e.preventDefault();
  list = getDataList("team3");
  debugger;
  if ($("#name").val() == "" || $("#maker").val() == "") {
    alert("Name and Maker are required fields!");
    return;
  }
  if (parseInt($("#price").val()) < 0  && parseInt($("#amount").val()) < 0) {
    alert("Price and Amount must be greater than 0!");
    return;
  }
  // let existedElement = changeExistedItem($("#name").val(), $("#maker").val(), $("#price").val(), $("#amount").val(), $("#location").val());
  // if (!existedElement) {
  if (CurrentMode == AppMode.EDIT_MODE) {
    item1 = list.find(item => item.Id === currentId);
    item1.Date = $("#date").val();
    item1.Name = $("#name").val();
    item1.Maker = $("#maker").val();
    item1.Price = $("#price").val();
    item1.Amount = $("#amount").val();
    item1.Location = $("#location").val();
  }
  else {
    generateUniqueId();
    var dateValue = $("#date").val();
    var nameValue = $("#name").val();
    var makerValue = $("#maker").val();
    var priceValue = $("#price").val();
    var amountValue = $("#amount").val();
    var locationValue = $("#location").val();

    const product = new Product(generateUniqueId(), dateValue, nameValue, makerValue, priceValue, amountValue, locationValue)
    // alert("You must implement this function [Exercise 2]");
    list.push(product)
  }
  ShowList(list);
  setDataList(list, "team3")
});
var isEdit = false;
var currentId;
// [Exercise 3] Edit Action
function editProduct(id) {
  list = getDataList("team3");
  debugger;
  currentId = id;
  CurrentMode = AppMode.EDIT_MODE;
  const indexToDelete = list.findIndex(item => item.Id === id);
  if (indexToDelete === -1) {
    alert("Khong tim thay san pham");
  }
  else{
    ShowPopup(list[indexToDelete]);
  }
}

// [Exercise 4] Delete Action
function deleteProduct(id) {
  // debugger;
  let text = "Are you sure to delete?";
  // if (!confirm(text)) {
  //   return 0;
  // }
 // Find the index of the product with the given ID in the list
 const indexToDelete = list.findIndex(item => item.Id === id);

 // Check if the product was found
 if (indexToDelete !== -1) {
   // Ask the user for confirmation before deleting
   if (confirm(text)) {
     // Remove the product from the list
     list.splice(indexToDelete, 1);

     // Update the table with the new data
     ShowList(list);

     // Update the data in localStorage
     setDataList(list, "team3"); // Update the data in localStorage with the key "team3"

     // Optionally, you can display a success message
     alert("Product deleted successfully!");
   }
 } else {
   // Product not found, you can display an error message or handle it as needed
   alert("Product not found.");
 }
  // alert("You must implement this function [Exercise 4]");
}

// [Exercise 5] Export Action
function exportProduct(id) {
  // debugger;

  CurrentMode = AppMode.EXPORT_MODE;

  // Show pop up
  ShowPopup(item1);
  const product = list.find((item) => item.Id === id);
  // Check if the product is found
  if (product) {
    // Display the export dialog
    ShowPopup(product);

    // Bind the "Export" button click event
    $("#SaveButton").off("click").on("click", function (e) {
      e.preventDefault();

      // Get the export quantity entered by the user
      const exportQuantity = parseInt($("#amount").val());

      // Check if the export quantity is valid
      if (exportQuantity > 0 && exportQuantity <= parseInt(product.Amount)) {
        // Update the product's quantity in the warehouse
        product.Amount = exportQuantity;

        // Close the export dialog
        $("#AddEditPopup").modal("hide");

        // Show success message (you can replace this with your own alert)
        alert(`Exported ${exportQuantity} ${product.Name}(s) successfully!`);

        // Update the table to reflect the changes
        ShowList(list);
      } else {
        // Display an error message for an invalid export quantity
        alert("Invalid export quantity. Please enter a valid quantity.");
      }
    });
  } else {
    alert("Product not found.");
  }
}

// [Exercise 6] Export Process
$("#ExportButton").click(function () {
  // debugger;
  if (CurrentMode == AppMode.LIST_MODE) {
    // Update list
    $("#AppTitle").text(AppTitleName.EXPORT_TITLE);
    $("#ExportButton").text(ExportButtonName.NAME_IN_EXPORT);
    CurrentMode = AppMode.EXPORT_MODE;
    $("#ImportButton").hide();
    $("#ShipButton").show();
    $("#TotalTitle").show();
    updateTotalAmount(list);
  } else {
    // Update list
    $("#AppTitle").text(AppTitleName.STORE_TITLE);
    $("#ExportButton").text(ExportButtonName.NAME_IN_STORE);
    CurrentMode = AppMode.LIST_MODE;
    $("#ImportButton").show();
    $("#TotalTitle").hide();
    $("#ShipButton").hide();
  }
  ShowList(list);
  // alert("You must implement this function [Exercise 6]");
});

// [Exercise 7] Shipment Action
$("#ShipButton").click(function () {
  list = [];
    
  // Update the UI and return to the main screen
  $("#AppTitle").text(AppTitleName.STORE_TITLE);
  $("#ExportButton").text(ExportButtonName.NAME_IN_STORE);
  CurrentMode = AppMode.LIST_MODE;
  $("#TotalTitle").hide();
  $("#ShipButton").hide();
  $("#ImportButton").show();
  
  // Clear the table
  $("#TableList").empty();

  // Update the total amount (it should be 0 after shipment)
  updateTotalAmount(list);

});

// [Exercise 8] Search Action
$("#SearchButton").click(function () {
  // debugger;
  // alert("You must implement this function [Exercise 8]");
  const keyword = $("#keySearch").val().toLowerCase().trim();
  const baseList = getDataList("team3");
  list = $.grep(baseList, function(item) {
    return item.Name.toLowerCase().includes(keyword) || item.Maker.toLowerCase().includes(keyword);
  });
  ShowList(list);
  list = baseList;
});

// [Exercise 9] Sort Price Action
$("#PriceSortButton").click(function () {
  debugger;

  // sort state
  CurrentPriceOrder = CurrentPriceOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

  // Sort the list based on the current sort order
  if (CurrentPriceOrder === SortOrder.ASC) {
    list.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
  } else {
    list.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
  }

  // Update the table to reflect the sorted order
  ShowList(list);

  // Update the sort icon
  if (CurrentPriceOrder === SortOrder.ASC) {
    $("#PriceSortIcon").removeClass("fa fa-angle-down").addClass("fa fa-angle-up");
  } else {
    $("#PriceSortIcon").removeClass("fa fa-angle-up").addClass("fa fa-angle-down");
  }
});

// [Exercise 10] Sort Date Action
$("#DateSortButton").click(function () {
  debugger;

  // sort state
  switch (CurrentDateOrder) {
    case SortOrder.NONE:
    case SortOrder.DESC:
      CurrentDateOrder = SortOrder.ASC;
      $("#DateSortIcon").removeClass("fa fa-angle-down");
      $("#DateSortIcon").addClass("fa fa-angle-up");
      
      break;
    case SortOrder.ASC:
      CurrentDateOrder = SortOrder.DESC;
      $("#DateSortIcon").removeClass("fa fa-angle-up");
      $("#DateSortIcon").addClass("fa fa-angle-down");
      break;
  }

  // alert("You must implement this function [Exercise 10]");
});

// [Exercise 11] Filter text Action
$("#FilterInputText").on("input", function () {
  debugger;
  // alert("You must implement this function [Exercise 11]");
  const keyword = $("#FilterInputText").val().toLowerCase().trim();
  const baseList = getDataList("team3");
  list = $.grep(baseList, function(item) {
    return item.Name.toLowerCase().includes(keyword) || item.Maker.toLowerCase().includes(keyword);
  });
  ShowList(list);
  list = baseList;
});

// [Exercise 12] Filter list Action
$("#FilterStatusDropDownList").change(function () {
  const selectedStatus = $(this).val();
  // Call the filterByStatus function with the selected status
  filterByStatus(selectedStatus);
});