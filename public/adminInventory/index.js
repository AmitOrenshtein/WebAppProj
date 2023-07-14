  $(document).ready(function() {
    loadProducts();
    loadSuppliers();
    loadBranches();
  });

  function loadProducts() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:80/products',
      success: function(data) {
        renderProducts(data);
      },
      error: function(xhr, status, error) {
        console.error(error);
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
        console.error(error);
      }
    });
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

      var supplierElement = $('<p class="prodSupplier"></p>');
      supplierElement.text('Supplier: ' + product.supplier);

      var descElement = $('<p class="prodDesc"></p>');
      descElement.text(product.description);

      var priceElement = $('<p class="prodPrice"></p>');
      priceElement.text('Price: ' + product.price.toFixed(2));

      var updateButton = $('<button class="updateBtn">Update</button>');
      updateButton.data('id', product.id);

      var deleteButton = $('<button class="deleteBtn">Delete</button>');
      deleteButton.data('id', product.id);

      productElement.append(titleElement);
      productElement.append(imgElement);
      productElement.append(categoryElement);
      productElement.append(supplierElement);
      productElement.append(descElement);
      productElement.append(priceElement);
      productElement.append(updateButton);
      productElement.append(deleteButton);

      productsContainer.append(productElement);
    }

    productsContainer.on('click', '.updateBtn', function() {
      var productId = $(this).data('id');
      updateProduct(productId);
    });

    productsContainer.on('click', '.deleteBtn', function() {
      var productId = $(this).data('id');
      deleteProduct(productId);
    });
  }

  function updateProduct(productId) {
    var updatedProduct = {};

    updatedProduct.name = prompt('Enter the updated product name:');
    updatedProduct.category = prompt('Enter the updated product category:');
    updatedProduct.price = prompt('Enter the updated product price:');

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:80/products/' + productId,
      data: JSON.stringify(updatedProduct),
      contentType: 'application/json',
      success: function(response) {
        console.log('Product updated successfully:', response);
        loadProducts();
      },
      error: function(xhr, status, error) {
        console.error('Error updating product:', error);
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
      }
    });
  }

  function renderBranches(branches) {
    console.log(branches)
    var branchesContainer = $('#branches-container');
    branchesContainer.empty();

    for (var i = 0; i < branches.length; i++) {
      var branch = branches[i];
      var branchElement = $('<div class="branch"></div>');

      var nameElement = $('<h3 class="branchName"></h3>');
      nameElement.text(branch.name);

      var addressElement = $('<p class="branchAddress"></p>');
      addressElement.text('Address: ' + branch.address);

      var contactElement = $('<p class="branchContact"></p>');
      contactElement.text('Contact: ' + branch.contact);

      branchElement.append(nameElement);
      branchElement.append(addressElement);
      branchElement.append(contactElement);

      branchesContainer.append(branchElement);
    }
  }
