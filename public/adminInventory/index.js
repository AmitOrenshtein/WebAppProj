// Function to handle product creation form submission
function createProduct(event) {
  event.preventDefault();
  const name = document.getElementById('product-name').value;

  // Send a request to the backend API to create the product
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      // Include other form data in the request body
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      // For example, update the product list display with the newly created product
      fetchProducts();
    })
    .catch(error => {
      // Handle errors
      console.error('Error creating product:', error);
    });
}

// Function to handle supplier creation form submission
function createSupplier(event) {
  event.preventDefault();
  const name = document.getElementById('supplier-name').value;
  // Retrieve other form data as needed

  // Send a request to the backend API to create the supplier
  fetch('/api/suppliers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      // Include other form data in the request body
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      // For example, update the supplier list display with the newly created supplier
      fetchSuppliers();
    })
    .catch(error => {
      // Handle errors
      console.error('Error creating supplier:', error);
    });
}

// Function to handle branch creation form submission
function createBranch(event) {
  event.preventDefault();
  const name = document.getElementById('branch-name').value;
  // Retrieve other form data as needed

  // Send a request to the backend API to create the branch
  fetch('/api/branches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      // Include other form data in the request body
    }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      // For example, update the branch list display with the newly created branch
      fetchBranches();
    })
    .catch(error => {
      // Handle errors
      console.error('Error creating branch:', error);
    });
}

// Function to handle product deletion
function deleteProduct(productId) {
  // Send a request to the backend API to delete the product
  fetch(`/api/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => {
      // Handle the response from the backend
      // For example, update the product list display after deletion
      fetchProducts();
    })
    .catch(error => {
      // Handle errors
      console.error('Error deleting product:', error);
    });
}

// Function to handle product update
function updateProduct(productId, newName) {
  // Send a request to the backend API to update the product
  fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      // Include other updated fields in the request body
    }),
  })
    .then(response => {
      // Handle the response from the backend
      // For example, update the product list display after update
      fetchProducts();
    })
    .catch(error => {
      // Handle errors
      console.error('Error updating product:', error);
    });
}

// Function to handle supplier deletion
function deleteSupplier(supplierId) {
  // Send a request to the backend API to delete the supplier
  fetch(`/api/suppliers/${supplierId}`, {
    method: 'DELETE',
  })
    .then(response => {
      // Handle the response from the backend
      // For example, update the supplier list display after deletion
      fetchSuppliers();
    })
    .catch(error => {
      // Handle errors
      console.error('Error deleting supplier:', error);
    });
}

// Function to handle supplier update
function updateSupplier(supplierId, newName) {
  // Send a request to the backend API to update the supplier
  fetch(`/api/suppliers/${supplierId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
    }),
  })
    .then(response => {
      fetchSuppliers();
    })
    .catch(error => {
      console.error('Error updating supplier:', error);
    });
}

function deleteBranch(branchId) {
  fetch(`/api/branches/${branchId}`, {
    method: 'DELETE',
  })
    .then(response => {
      fetchBranches();
    })
    .catch(error => {
      console.error('Error deleting branch:', error);
    });
}

function updateBranch(branchId, newName) {
  fetch(`/api/branches/${branchId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
    }),
  })
    .then(response => {
      fetchBranches();
    })
    .catch(error => {
      console.error('Error updating branch:', error);
    });
}

document.getElementById('create-product-form').addEventListener('submit', createProduct);
document.getElementById('create-supplier-form').addEventListener('submit', createSupplier);
document.getElementById('create-branch-form').addEventListener('submit', createBranch);

function fetchProducts() {
  fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';

      data.forEach(product => {
        const productItem = document.createElement('div');
        productItem.textContent = product.name;

        productList.appendChild(productItem);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

function fetchSuppliers() {
  fetch('/api/suppliers')
    .then(response => response.json())
    .then(data => {
      const supplierList = document.getElementById('supplier-list');
      supplierList.innerHTML = '';

      data.forEach(supplier => {
        const supplierItem = document.createElement('div');
        supplierItem.textContent = supplier.name;

        supplierList.appendChild(supplierItem);
      });
    })
    .catch(error => {
      console.error('Error fetching suppliers:', error);
    });
}

function fetchBranches() {
  fetch('/api/branches')
    .then(response => response.json())
    .then(data => {
      const branchList = document.getElementById('branch-list');
      branchList.innerHTML = '';

      data.forEach(branch => {
        const branchItem = document.createElement('div');
        branchItem.textContent = branch.name;

        branchList.appendChild(branchItem);
      });
    })
    .catch(error => {
      console.error('Error fetching branches:', error);
    });
}

window.addEventListener('load', function () {
  fetchProducts();
  fetchSuppliers();
  fetchBranches();
});
