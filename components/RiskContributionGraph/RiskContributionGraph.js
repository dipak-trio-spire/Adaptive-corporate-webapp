import React from 'react';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line
} from 'recharts';

function renderColorfulLegendText(value, entry, totals) {
    const { color } = entry;
    let total = 0;
    switch (value) {
        case "Market Contribution":
            total = totals.marketContributionTotal;
            break;
        case "Idiosyncratic Portion":
            total = totals.idiosyncraticPortionTotal;
            break;
        case "Diversified Risk":
            total = totals.isolatedRiskTotal;
            break;
        default:
            break;
    }
    return <span style={{ color }}>{`${value} (Total ${total})`}</span>;
}
function RiskContributionGraph({ data, maxNormalizedRisk, minNormalizedRisk, totals , hostname}) {
    const fillColor = hostname === "halo" ? "#081A66" : "#60034c";
    const secfillColor = hostname === "halo" ? "#FFA654" : "#E58B76";
    let graph_length = Math.ceil((maxNormalizedRisk - 0) /5)
    console.log("graph chan", graph_length)
    return (
        <div style={{ width: "100%", height: "450px" }}>
            <ResponsiveContainer width='100%' height={420}>
                <ComposedChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="symbol" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, maxNormalizedRisk]}
                        tickFormatter={(value) => `${value.toFixed(2)}%`}
                        interval={0}
                        ticks={Array.from({ length: Math.ceil(maxNormalizedRisk / graph_length) + 1 }, (_, i) => i * graph_length)}
                    />
                    <Tooltip />
                    <Legend formatter={(value, entry) => renderColorfulLegendText(value, entry, totals)} />
                    <Bar yAxisId="left"
                        barSize={50}
                        stackId="a" dataKey="market_contribution" fill={fillColor}  name="Market Contribution" />
                    <Bar yAxisId="left"
                        barSize={50}
                        stackId="a" dataKey="idiosyncratic_portion" fill="#ffa654" name="Idiosyncratic Portion" />
                    <Bar yAxisId="left"
                        fillOpacity={0.4}
                        barSize={50} stackId="a" dataKey="isolated_risk" fill="#F2C5BB" name="Diversified Risk" />
                    <Line yAxisId="right"
                        type="monotone"
                        dataKey="normalizedMarketRisk"
                        strokeOpacity={0.001}
                        dot={false}
                        name="Normalized Risk"
                        legendType="none"
                        tooltipType='none' />
                    <Line yAxisId="right"
                        type="monotone"
                        dataKey="normalizedIdioRisk"
                        strokeOpacity={0.001}
                        dot={false}
                        name="Normalized Risk"
                        legendType="none"
                        tooltipType='none' />
                    <Line yAxisId="right"
                        type="monotone"
                        dataKey="normalizedIsoRisk"
                        strokeOpacity={0.001}
                        dot={false}
                        name="Normalized Risk"
                        legendType="none"
                        tooltipType='none' />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RiskContributionGraph;
