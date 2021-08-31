import axios from 'axios';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, Legend } from 'recharts';

export default class Example extends PureComponent {
    constructor() {
        super()
        this.state = {
            data: [],
            filter: 'All'
        }
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:8080/policy/policiesCount')
        if (data.status) {
            this.setState({ data: data.groupedData })
        }
    }

    render() {
        return (
            <div>
                <AreaChart
                    width={1100}
                    height={400}
                    data={this.state.data}
                    margin={{
                        top: 40,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey={this.state.filter} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
                <BarChart
                    width={1100}
                    height={400}
                    data={this.state.data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="North" stackId="a" fill="#8884d8" />
                    <Bar dataKey="South" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="East" stackId="a" fill="#73fd99" />
                    <Bar dataKey="West" stackId="a" fill="#90ff32" />
                </BarChart>
            </div>
        );
    }
}
