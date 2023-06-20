import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cubejsApi = cubejs(
  process.env.REACT_APP_CUBE_JS_API_KEY,
  { apiUrl: process.env.REACT_APP_CUBE_JS_API_URL }
);

const colors = ['#FF6492', '#141446', '#7A77FF'];

const BarChartRenderer0 = () => {
  return (
    <QueryRenderer
      query={{
        "dimensions": [
          "kdd_cup_1999_dataset.protocol_type"
        ],
        "order": {
          "kdd_cup_1999_dataset.count": "desc"
        },
        "measures": [
          "kdd_cup_1999_dataset.count"
        ]
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

        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={resultSet.chartPivot()}>
              <XAxis dataKey="x" />
              <YAxis />
              <CartesianGrid />
              <Legend />
              <Tooltip />
              {resultSet.seriesNames().map((series, i) => (
                <Bar
                  key={series.key}
                  stackId="a"
                  dataKey={series.key}
                  name={series.title}
                  fill={colors[i]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      }}
    />
  );
};

export default BarChartRenderer0;
