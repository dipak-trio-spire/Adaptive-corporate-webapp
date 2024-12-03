import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import React, { memo } from 'react';

function MonteCarloSimulation({ data, lines, yMin, yMax, portfolioTotalValue }) {

    const formatTick = (value) => {
        if (!value) {
            return "$0.00";
        }
        if (value >= 1000000000) {
            return `$${(value / 1000000000).toFixed(2)}B`;
        } else if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(2)}K`;
        }
        return value.toFixed(2);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const yAxisTicks = [portfolioTotalValue, ...Array.from({ length: 2 }, (_, i) => Math.ceil(yMax / 2) * (i + 1))];

    return (
        <div style={{ width: "100%" }}>
            <ResponsiveContainer
                width='100%'
                height={450}>
                <LineChart data={data}
                    margin={{ top: 20, right: 0, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        tickLine={false}
                        hide={true}>
                    </XAxis>
                    <YAxis
                        type="number"
                        tick={{ fontSize: 12 }}
                        tickFormatter={formatTick}
                        domain={[yMin, yMax]}
                        ticks={yAxisTicks}
                        interval={0}
                        label={{ value: "Portfolio Value", position: 'insideLeft', fill: "#60034c", offset: -30, angle: -90 }} />
                    {lines.map((line, index) => {
                        return <Line type="monotone" key={index} dataKey={line} stroke={getRandomColor()} dot={false} />
                    }
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export default memo(MonteCarloSimulation);