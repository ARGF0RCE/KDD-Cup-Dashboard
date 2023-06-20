import React from 'react';
import BarChartRenderer0 from './BarChartRenderer0';
import PieChartRenderer0 from './PieChartRenderer0';
import axios from 'axios';
import cubejs from '@cubejs-client/core';
import { useEffect, useState } from 'react';

function App() {
  const [cubejsApi, setCubejsApi] = useState(null);

  useEffect(() => {
    axios.get('https://us-central1-kdd-dashboard.cloudfunctions.net/getCubejsConfig')
      .then((response) => {
        const { key, url } = response.data;
        const api = cubejs(key, { apiUrl: url });
        setCubejsApi(api);
      })
      .catch((error) => {
        console.error('Error fetching Cube.js config:', error);
      });
  }, []);

  if (!cubejsApi) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BarChartRenderer0 cubejsApi={cubejsApi} />
      <PieChartRenderer0 cubejsApi={cubejsApi} />
    </div>
  );
}

export default App;
