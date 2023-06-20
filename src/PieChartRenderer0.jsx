import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cubejsApi = cubejs(
  process.env.REACT_APP_CUBE_JS_API_KEY,
  { apiUrl: process.env.REACT_APP_CUBE_JS_API_URL }
);

const colors = ['#FF6492', '#141446', '#7A77FF'];

const PieChartRenderer0 = () => {
    return (
    <QueryRenderer
      query={{
        "measures": [
          "kdd_cup_1999_dataset.count"
        ],
        "dimensions": [
          "kdd_cup_1999_dataset.flag"
        ],
        "order": {
          "kdd_cup_1999_dataset.count": "desc"
        }
      }}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={({ resultSet, error }) => {
        if (error) {
          return <div>{error.toString()}</div>;
        }

        if (!resultSet) {
          return <Spin />;
        }
    console.log(resultSet.toString());
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                isAnimationActive={false}
                data={resultSet.chartPivot()}
                nameKey="x"
                dataKey={resultSet.seriesNames()[0].key}
                fill="#8884d8"
              >
                {resultSet.chartPivot().map((e, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      }}
    />
  );
};

export default PieChartRenderer0;
