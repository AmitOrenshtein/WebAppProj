async function fetchData() {
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
}

async function renderGraphs() {
  const data = await fetchData();

  if (!data) {
    return;
  }

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
  }, {});s

  const dateGraphData = Object.entries(dateData).map(([date, sales]) => ({ date, sales }));
  const dateGraphOptions = {
    title: 'Number of Sales by Date',
    type: 'line',
    xLabel: 'Date',
    yLabel: 'Number of Sales',
  };
  js3d.graph('graph2', dateGraphData, dateGraphOptions);
}

window.addEventListener('load', renderGraphs);
