import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Chart, { Series, ArgumentAxis, Label, Export, Legend, Tooltip } from 'devextreme-react/chart';
import 'devextreme/dist/css/dx.light.css';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3031/monthlyWeights')
            .then(result => result.json())
            .then(data => {
                setData(data);
                // Set chart data accordingly, this is just an example
                setChartData(data.map(item => ({
                    argument: item.record_date,
                    value: item.weight
                })));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <div className="card">
                        <h3>Title</h3>
                        <p>$45,678.90</p>
                        <p>+20% month over month</p>
                    </div>
                </div>
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <div className="card">
                        <h3>Title</h3>
                        <p>2,405</p>
                        <p>+33% month over month</p>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div className="card">
                        <h3>Title</h3>
                        <p>10,353</p>
                        <p>-8% month over month</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ flex: 2, marginRight: '20px' }}>
                    <Chart dataSource={chartData}>
                        <Series
                            valueField="value"
                            argumentField="argument"
                            type="line"
                        />
                        <ArgumentAxis>
                            <Label />
                        </ArgumentAxis>
                        <Export enabled={true} />
                        <Legend visible={false} />
                        <Tooltip enabled={true} />
                    </Chart>
                </div>
                <div style={{ flex: 1 }}>
                    <div className="card">
                        <h3>Animals</h3>
                        <ul>
                            {data.map(item => (
                                <li key={item.eartag}>
                                    {item.eartag} - {item.weight} kg
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <Chart dataSource={chartData}>
                    <Series
                        valueField="value"
                        argumentField="argument"
                        type="bar"
                    />
                    <ArgumentAxis>
                        <Label />
                    </ArgumentAxis>
                    <Export enabled={true} />
                    <Legend visible={false} />
                    <Tooltip enabled={true} />
                </Chart>
            </div>
        </div>
    );
};

export default Dashboard;
