import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import React, { memo } from 'react';

function PortfolioReturnGraph({ data, gradientId, xMin, xMax, yMax }) {

    return (
        <div style={{ width: "100%" }}>
            <ResponsiveContainer
                width='100%'
                height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60034C" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#60034C" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="interval"
                        // angle={-80}
                        domain={[xMin, xMax]}
                        tick={{ fontSize: 8 }}
                        tickFormatter={(tick) => `${tick}%`}
                        label={{ value: "Portfolio Return", position: 'insideBottom', offset: -5, fill: "#60034C" }} >
                    </XAxis>
                    <YAxis
                        tick={{ fontSize: 12 }}
                        domain={[0, yMax]}
                        label={{ value: "Probability", position: 'insideLeft', angle: -90, fill: "#60034C" }}>
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="count"
                        fill={`url(#${gradientId})`}
                        barSize={10}
                        gradientUnits={0.5}
                        radius={[10, 10, 0, 0]}
                        xvalue="Portfolio Return" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default memo (PortfolioReturnGraph);