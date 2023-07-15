$(document).ready(function() {
    renderGraphs();
  });
  
  async function renderGraphs() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    // Fetch product data
    const product = await getProduct(productId);
  
    if (!product) {
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = 'Error fetching data. Please try again later.';
        return null;
      }
    };
  
    // Group by category of product
    const categoryData = data.reduce((result, item) => {
      if (!result[item.category]) {
        result[item.category] = 0;
      }
      result[item.category] += item.sales;
      return result;
    }, {});
  
    const categoryGraphData = Object.entries(categoryData).map(([category, sales]) => ({ category, sales }));
    const categoryGraphOptions = {
      title: 'Number of Sales by Product Category',
      type: 'bar',
      xLabel: 'Category',
      yLabel: 'Number of Sales',
    };
    js3d.graph('graph1', categoryGraphData, categoryGraphOptions);
  
    const dateData = data.reduce((result, item) => {
      const date = item.date.substring(0, 10);
      if (!result[date]) {
        result[date] = 0;
      }
      result[date] += item.sales;
      return result;
    }, {});
  
    const dateGraphData = Object.entries(dateData).map(([date, sales]) => ({ date, sales }));
    const dateGraphOptions = {
      title: 'Number of Sales by Date',
      type: 'line',
      xLabel: 'Date',
      yLabel: 'Number of Sales',
    };
    js3d.graph('graph2', dateGraphData, dateGraphOptions);
  }
  
  function getProduct(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:80/products/' + id,
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, error) {
          console.error(error);
          reject(error);
        }
      });
    });
  }
  
  window.addEventListener('load', renderGraphs);
  
  
  function getPurchaseHistory() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:80/purchasehistory',
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, error) {
          console.error(error);
          reject(error);
        },
      });
    });
  }
  