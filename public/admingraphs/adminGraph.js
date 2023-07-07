
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
  
  // Function to render the graphs
  async function renderGraphs() {
    const data = await fetchData();
  
    if (!data) {
      // Data fetch error occurred, stop rendering graphs
      return;
    }
  
    // Generate the first graph
    const graph1Data = data.monthlyPurchases;
    const graph1Options = {
      title: 'Average Cumulative Average of Purchases',
      type: 'line',
      xLabel: 'Month',
      yLabel: 'Average',
    };
    js3d.graph('graph1', graph1Data, graph1Options);
  
    // Generate the second graph 
    const graph2Data = data.anotherStatistic;
    const graph2Options = {
      title: 'Another Statistic',
      type: 'bar',
      xLabel: 'Category',
      yLabel: 'Count',
    };
    js3d.graph('graph2', graph2Data, graph2Options);
  }
  
  // Call the renderGraphs function when the page loads
  window.addEventListener('load', renderGraphs);
  