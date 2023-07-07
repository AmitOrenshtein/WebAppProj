
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
  
  // Attach form submission event listeners
  document.getElementById('create-product-form').addEventListener('submit', createProduct);
  document.getElementById('create-supplier-form').addEventListener('submit', createSupplier);
  document.getElementById('create-branch-form').addEventListener('submit', createBranch);
  
  // Function to fetch and display the list of products
  function fetchProducts() {
    // Send a request to the backend API to fetch the list of products
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        // Update the product list display with the fetched data
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
  
        // Loop through the products and create HTML elements to display them
        data.forEach(product => {
          const productItem = document.createElement('div');
          productItem.textContent = product.name;
          // Create more HTML elements to display other product details
  
          productList.appendChild(productItem);
        });
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching products:', error);
      });
  }
  
  // Function to fetch and display the list of suppliers
  function fetchSuppliers() {
    // Send a request to the backend API to fetch the list of suppliers
    fetch('/api/suppliers')
      .then(response => response.json())
      .then(data => {
        // Update the supplier list display with the fetched data
        const supplierList = document.getElementById('supplier-list');
        supplierList.innerHTML = '';
  
        // Loop through the suppliers and create HTML elements to display them
        data.forEach(supplier => {
          const supplierItem = document.createElement('div');
          supplierItem.textContent = supplier.name;
          // Create more HTML elements to display other supplier details
  
          supplierList.appendChild(supplierItem);
        });
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching suppliers:', error);
      });
  }
  
  // Function to fetch and display the list of branches
  function fetchBranches() {
    // Send a request to the backend API to fetch the list of branches
    fetch('/api/branches')
      .then(response => response.json())
      .then(data => {
        // Update the branch list display with the fetched data
        const branchList = document.getElementById('branch-list');
        branchList.innerHTML = '';
  
        // Loop through the branches and create HTML elements to display them
        data.forEach(branch => {
          const branchItem = document.createElement('div');
          branchItem.textContent = branch.name;
          // Create more HTML elements to display other branch details
  
          branchList.appendChild(branchItem);
        });
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching branches:', error);
      });
  }
  
  // Call the fetch functions when the page loads
  window.addEventListener('load', function () {
    fetchProducts();
    fetchSuppliers();
    fetchBranches();
  });
  