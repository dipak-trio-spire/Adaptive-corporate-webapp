import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip"
                style={{
                    backgroundColor: "#F5E9F3", padding: "8px",
                    borderRadius: "2px", opacity: "0.8",
                    fontFamily: "Overpass, sans-serif", fontSize: "14px"
                }}>
                <p className="label" style={{ color: "black" }}>{`${moment(label).format('MMM, DD YYYY')}`}</p>
                <p className="intro" style={{ color: "#60034C" }}>{`⬤ VIX : ${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};


function VixGraph({GraphData}) {

    const data = GraphData["closeprice"].map((price, index) => ({ tradeDate: GraphData["tradedate"][index], closePrice: price }));

    const CustomizedAxisTick = props => {
        const { x, y, payload } = props;
        if (payload.value === data[0].tradeDate || payload.value === data[data.length - 1].tradeDate) {
            return (
                <g transform={`translate(${x},${y})`}>
                    <text x={0} y={0} dy={16} style={{ fontFamily: "Overpass, sans-serif", fontSize: "12px " }}
                        textAnchor={payload.value === data[0].tradeDate ? "start" : "end"} fill="#60034C">{moment(payload.value).format('MMM, DD YYYY')}</text>
                </g>
            );
        } else {
            return null;
        }
    };
    return (

        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60034C" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#F5E9F3" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="tradeDate" tick={<CustomizedAxisTick />} tickLine={false} interval={'preserveStartEnd'} />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="linear" dataKey="closePrice" stroke="#60034C" fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
export default VixGraph;
