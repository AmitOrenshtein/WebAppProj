$(document).ready(function() {
  loadProducts();
  loadBranches();
  $( "#searchForm" ).on( "submit", function( event ) {
    event.preventDefault();
    search();
  });
  $("#branchSearchForm").on("submit", function(event) {
    event.preventDefault();
    searchBranches();
  });
});

function loadProducts() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:80/products',
    success: function(data) {
      renderProducts(data);
    },
    error: function(xhr, status, error) {
      console.error('AJAX Request Error:', error);
      console.log('XHR Object:', xhr);
    }
  });
}

function loadBranches() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:80/branches',
    success: function(data) {
      renderBranches(data);
    },
    error: function(xhr, status, error) {
      console.error('AJAX Request Error:', error);
      console.log('XHR Object:', xhr);
    }
  });
}

function search() {
  let searchText = $("#searchText").val();
  let category = $("#searchCategory").val();
  let brand = $("#searchBrand").val();
  let minPrice = $("#searchMinPrice").val();
  let maxPrice = $("#searchMaxPrice").val();
  if (searchText !== "" && !isValidName(searchText)) {
    showError("Invalid characters entered in the product name.");
    return;
  }

  if (
    (minPrice !== "" && isNaN(parseFloat(minPrice))) ||
    (maxPrice !== "" && isNaN(parseFloat(maxPrice)))
  ) {
    showError("Invalid price entered. Please enter a valid number.");
    return;
  }
  if (
    (minPrice !== "" && parseFloat(minPrice) < 0) ||
    (maxPrice !== "" && parseFloat(maxPrice) < 0)
  ) {
    showError("Price cannot be negative.");
    return;
  }

  if (minPrice !== "" && maxPrice !== "" && parseFloat(minPrice) > parseFloat(maxPrice)) {
    showError("Minimum price cannot be greater than maximum price.");
    return;
  }

  if (
    searchText === "" &&
    category === "none" &&
    brand === "none" &&
    minPrice === "" &&
    maxPrice === ""
  ) {
    loadProducts();
  } else{
    let filter = {};
    if (searchText !== "")
      filter.name = searchText;
    if (category !== "none")
      filter.category = category;
    if (brand !== "none")
      filter.brand = brand;
    if (minPrice !== "" && minPrice !== 0)
      filter.minPrice = minPrice;
    if (maxPrice !== "" && maxPrice !== 0)
      filter.maxPrice = maxPrice;

    let branchSearchText = $("#branchSearchText").val();
    if (branchSearchText !== "")
      filter.branchName = branchSearchText;

    $.ajax({
      type: "POST",
      url: "http://localhost:80/products/search",
      data: filter,
      success: function (data) {
        console.log(data);
        renderProducts(data);
      },
      error: function (XMLHttpRequest, textStatus, error) {
        alert("Error while purchasing! message: " + XMLHttpRequest.responseText);
      },
    });
  }
}

function searchBranches() {
  let branchSearchText = $("#branchSearchText").val();
  let filter = {};
  if (branchSearchText === "") {
      loadBranches();
  }else{
    if (branchSearchText !== "" && !isValidName(branchSearchText)) {
      showError("Invalid characters entered in the branch name.");
      return;
    }
  
    if (branchSearchText !== "") {
      filter.branchName = branchSearchText;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:80/branches/search",
      data: filter,
      success: function(data) {
        console.log(data);
        renderBranches(data);
      },
      error: function(XMLHttpRequest, textStatus, error) {
        alert("Error while searching branches! Message: " + XMLHttpRequest.responseText);
      },
    });
  }
}

function renderProducts(products) {
  var productsContainer = $('#products-container');
  productsContainer.empty();

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productElement = $('<div class="product"></div>');

    var titleElement = $('<h3 class="prodTitle"></h3>');
    titleElement.text(product.name);

    var imgElement = $('<img class="prodImg" src="">');
    imgElement.attr('src', product.image);
    imgElement.attr('width', '100');

    var categoryElement = $('<p class="prodCategory"></p>');
    categoryElement.text('Category: ' + product.category);

    var brandElement = $('<p class="prodBrand"></p>');
    brandElement.text('Brand: ' + product.brand);

    var descElement = $('<p class="prodDesc"></p>');
    descElement.text(product.description);

    var priceElement = $('<p class="prodPrice"></p>');
    var formattedPrice =Math.floor(product.price)+ '$'; 
    priceElement.text('Price: ' + formattedPrice);

    var amountElement = $('<p class="prodAmount"></p>');
    amountElement.text('Amount: ' + product.amountInInventory);

    var updateButton = $('<button class="updateBtn">Update</button>');
    updateButton.data('id', product._id);

    var deleteButton = $('<button class="deleteBtn">Delete</button>');
    deleteButton.data('id', product._id);

    productElement.append(titleElement);
    productElement.append(imgElement);
    productElement.append(categoryElement);
    productElement.append(brandElement);
    productElement.append(descElement);
    productElement.append(priceElement);
    productElement.append(amountElement);
    productElement.append(updateButton);
    productElement.append(deleteButton);

    productsContainer.append(productElement);
  }

  var createButton = $('<button class="createBtn">Create</button>');
  productsContainer.append(createButton);

  productsContainer.on('click', '.updateBtn', function() {
    var productId = $(this).data('id');
    if (productId === 'create') {
      createProduct();
    } else {
      updateProduct(productId);
    }
  });

  productsContainer.on('click', '.deleteBtn', function() {
    var productId = $(this).data('id');
    deleteProduct(productId);
  });

  productsContainer.on('click', '.createBtn', function() {
    createProduct();
  });
}

var isUpdating = false;

function updateProduct(productId) {
  if (isUpdating) {
    return;
  }
  isUpdating = true;

  var updatedProduct = {};

  updatedProduct.name = prompt('Enter the updated product name:');
  if (updatedProduct.name === null) {
    isUpdating = false; 
    return;
  }

  updatedProduct.category = prompt('Enter the updated product category:');
  if (updatedProduct.category === null) {
    isUpdating = false; 
    return;
  }

  updatedProduct.brand = prompt('Enter the updated product brand:');
  if (updatedProduct.brand === null) {
    isUpdating = false; 
    return;
  }

  updatedProduct.price = parseFloat(prompt('Enter the updated product price:'));
  if (isNaN(updatedProduct.price) || updatedProduct.price <= 0) {
    isUpdating = false; 
    console.error('Invalid price entered');
    return;
  }

  updatedProduct.amountInInventory = parseInt(prompt('Enter the updated product amount in inventory:'));
  if (isNaN(updatedProduct.amountInInventory) || updatedProduct.amountInInventory < 0) {
    isUpdating = false; 
    console.error('Invalid amount entered');
    return;
  }

  updatedProduct.image = prompt('Enter the updated product image URL:');
  if (updatedProduct.image === null) {
    isUpdating = false; 
    return;
  }

  updatedProduct.video = prompt('Enter the updated product video URL:');
  if (updatedProduct.video === null) {
    isUpdating = false; 
    return;
  }

  $.ajax({
    type: 'PUT',
    url: 'http://localhost:80/products/' + productId,
    data: updatedProduct,
    success: function(response) {
      console.log('Product updated successfully:', response);
      loadProducts();
      isUpdating = false;

    },
    error: function(xhr, status, error) {
      console.error('Error updating product:', error);
      isUpdating = false; 

    }
  });
}


function deleteProduct(productId) {
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:80/products/' + productId,
    success: function(response) {
      console.log('Product deleted successfully:', response);
      loadProducts();
    },
    error: function(xhr, status, error) {
      console.error('Error deleting product:', error);
    },
    complete: function() {
      isUpdating = false;
    }
  });
}

function createProduct() {
  var newProduct = {};

  newProduct.name = prompt('Enter the product name:');
  if (newProduct.name === null) {
    return;
  }

  newProduct.category = prompt('Enter the product category:');
  if (newProduct.category === null) {
    return;
  }

  newProduct.brand = prompt('Enter the product brand:');
  if (newProduct.brand === null) {
    return;
  }

  newProduct.price = parseFloat(prompt('Enter the product price:'));
  if (isNaN(newProduct.price) || newProduct.price <= 0) {
    console.error('Invalid price entered');
    return;
  }

  newProduct.amountInInventory = parseInt(prompt('Enter the product amount in inventory:'));
  if (isNaN(newProduct.amountInInventory) || newProduct.amountInInventory < 0) {
    console.error('Invalid amount entered');
    return;
  }

  newProduct.image = prompt('Enter the product image URL:');
  if (newProduct.image === null) {
    return;
  }

  newProduct.video = prompt('Enter the product video URL:');
  if (newProduct.video === null) {
    return;
  }

  $.ajax({
    type: 'POST',
    url: 'http://localhost:80/products',
    data: newProduct,
    success: function(response) {
      console.log('Product created successfully:', response);
      loadProducts();
    },
    error: function(xhr, status, error) {
      console.error('Error creating product:', error);
    }
  });
}

function renderBranches(branches) {
  var branchesContainer = $('#branches-container');
  branchesContainer.empty();

  for (var i = 0; i < branches.length; i++) {
    var branch = branches[i];
    var branchElement = $('<div class="branch"></div>');

    var nameElement = $('<h3 class="branchName"></h3>');
    nameElement.text(branch.name);

    var updateButton = $('<button class="updateBtn">Update</button>');
    updateButton.data('id', branch._id);

    var deleteButton = $('<button class="deleteBtn">Delete</button>');
    deleteButton.data('id', branch._id);

    branchElement.append(nameElement);
    branchElement.append(updateButton);
    branchElement.append(deleteButton);

    branchesContainer.append(branchElement);
  }

  var createButton = $('<button class="createBtn">Create</button>');
  branchesContainer.append(createButton);

  branchesContainer.on('click', '.updateBtn', function() {
    var branchId = $(this).data('id');
    if (branchId === 'create') {
      createBranch();
    } else {
      updateBranch(branchId);
    }
  });

  branchesContainer.on('click', '.deleteBtn', function() {
    var branchId = $(this).data('id');
    deleteBranch(branchId);
  });

  branchesContainer.on('click', '.createBtn', function() {
    createBranch();
  });
}


function updateBranch(branchId) {
  var updatedBranch = {};

  updatedBranch.name = prompt('Enter the updated branch name:');
  if (updatedBranch.name === null) {
    return;
  }
  updatedBranch.lat = parseFloat(prompt('Enter the updated branch latitude:'));
  if (isNaN(updatedBranch.lat)) {
    console.error('Invalid latitude entered');
    return;
  }

  updatedBranch.lng = parseFloat(prompt('Enter the updated branch longitude:'));
  if (isNaN(updatedBranch.lng)) {
    console.error('Invalid longitude entered');
    return;
  }


  $.ajax({
    type: 'PUT',
    url: 'http://localhost:80/branches/' + branchId,
    data: updatedBranch,
    success: function(response) {
      console.log('Branch updated successfully:', response);
      loadBranches();
    },
    error: function(xhr, status, error) {
      console.error('Error updating branch:', error);
    }
  });
}

function deleteBranch(branchId) {
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:80/branches/' + branchId,
    success: function(response) {
      console.log('Branch deleted successfully:', response);
      loadBranches();
    },
    error: function(xhr, status, error) {
      console.error('Error deleting branch:', error);
    }
  });
}

function createBranch() {
  var newBranch = {};

  newBranch.name = prompt('Enter the branch name:');
  if (newBranch.name === null) {
    return;
  }
  newBranch.lat = parseFloat(prompt('Enter the branch latitude:'));
  if (isNaN(newBranch.lat)) {
    console.error('Invalid latitude entered');
    return;
  }

  newBranch.lng = parseFloat(prompt('Enter the branch longitude:'));
  if (isNaN(newBranch.lng)) {
    console.error('Invalid longitude entered');
    return;
  }


  $.ajax({
    type: 'POST',
    url: 'http://localhost:80/branches',
    data: newBranch,
    success: function(response) {
      console.log('Branch created successfully:', response);
      loadBranches();
    },
    error: function(xhr, status, error) {
      console.error('Error creating branch:', error);
    }
  });
}

function isValidName(name) {
  const nameRegex = /^[a-zA-Z\s]*$/;
  return nameRegex.test(name);
}

function showError(message) {
  $("#error-message").text(message);
  $("#error-modal").modal("show");

  $("#error-modal .close").on("click", function() {
    $("#error-modal").modal("hide");
  });

  $("#error-modal .modal-footer .btn-secondary").on("click", function() {
    $("#error-modal").modal("hide");
  });

  $("#error-modal").on("hidden.bs.modal", function () {
    $("#error-modal .modal-footer .btn-secondary").off("click");
  });
}