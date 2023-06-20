import React from 'react';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const colors = ['#FF6492', '#141446', '#7A77FF'];

// cubejsApi should be passed as a prop instead of being created inside this component.
const BarChartRenderer0 = ({ cubejsApi }) => { // <- cubejsApi is now a prop
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
      cubejsApi={cubejsApi} // <- use the prop here
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
