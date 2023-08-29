var list = getDataList();

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
//<!-- ACTIONS -->
// [Exercise 1] Import Action
$("#ImportButton").click(function (e) {
  e.preventDefault();
  // debugger;

  CurrentMode = AppMode.ADD_MODE;
  ShowPopup();
  // alert("You must implement this function [Exercise 1]");
});

// [Exercise 2] Save Action
$("#SaveButton").click(function (e) {
  e.preventDefault();
  debugger;
  var dateValue = $("#date").val();
  var nameValue = $("#name").val();
  var makerValue = $("#maker").val();
  var priceValue = $("#price").val();
  var amountValue = $("#amount").val();
  var locationValue = $("#location").val();

  const product = new Product(generateUniqueId(), dateValue, nameValue, makerValue, priceValue, amountValue, locationValue)
  // alert("You must implement this function [Exercise 2]");
  list.push(product)
  ShowList(list);
  setDataList(list, "team3")
});

// [Exercise 3] Edit Action
function editProduct(id) {
  debugger;

  CurrentMode = AppMode.EDIT_MODE;
  ShowPopup(item1);
  alert("You must implement this function [Exercise 3]");
}

// [Exercise 4] Delete Action
function deleteProduct(id) {
  debugger;
  // let text = "Are you sure to delete?";
  // if (!confirm(text)) {
  //   return 0;
  // }

  alert("You must implement this function [Exercise 4]");
}

// [Exercise 5] Export Action
function exportProduct(id) {
  debugger;

  CurrentMode = AppMode.EXPORT_MODE;

  // Show pop up
  ShowPopup(item1);
  alert("You must implement this function [Exercise 5]");
}

// [Exercise 6] Export Process
$("#ExportButton").click(function () {
  debugger;
  if (CurrentMode == AppMode.LIST_MODE) {
    // Update list
    $("#AppTitle").text(AppTitleName.EXPORT_TITLE);
    $("#ExportButton").text(ExportButtonName.NAME_IN_EXPORT);
    CurrentMode = AppMode.EXPORT_MODE;
    $("#ImportButton").hide();
    $("#ShipButton").show();
    $("#TotalTitle").show();
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
  alert("You must implement this function [Exercise 6]");
});

// [Exercise 7] Shipment Action
$("#ShipButton").click(function () {
  $("#AppTitle").text(AppTitleName.STORE_TITLE);
  $("#ExportButton").text(ExportButtonName.NAME_IN_STORE);
  CurrentMode = AppMode.LIST_MODE;
  $("#TotalTitle").hide();
  $("#ShipButton").hide();
  $("#ImportButton").show();
  alert("You must implement this function [Exercise 7]");
});

// [Exercise 8] Search Action
$("#SearchButton").click(function () {
  debugger;
  alert("You must implement this function [Exercise 8]");
});

// [Exercise 9] Sort Price Action
$("#PriceSortButton").click(function () {
  debugger;

  // sort state
  switch (CurrentPriceOrder) {
    case SortOrder.NONE:
    case SortOrder.DESC:
      CurrentPriceOrder = SortOrder.ASC;
      $("#PriceSortIcon").removeClass("fa fa-angle-down");
      $("#PriceSortIcon").addClass("fa fa-angle-up");
      break;
    case SortOrder.ASC:
      CurrentPriceOrder = SortOrder.DESC;
      $("#PriceSortIcon").removeClass("fa fa-angle-up");
      $("#PriceSortIcon").addClass("fa fa-angle-down");
      break;
  }

  alert("You must implement this function [Exercise 9]");
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
  alert("You must implement this function [Exercise 10]");
});

// [Exercise 11] Filter text Action
$("#FilterInputText").on("input", function () {
  debugger;
  alert("You must implement this function [Exercise 11]");
});

// [Exercise 12] Filter list Action
$("#FilterStatusDropDownList").change(function () {
  debugger;
  alert("You must implement this function [Exercise 12]");
});