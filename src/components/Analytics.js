import axios from 'axios';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import LottieLoader from './PageLoader';

export default class Analytics extends PureComponent {
    constructor() {
        super()
        this.state = {
            data: [],
            filter: 'All',
            isLoaded: false
        }
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:8080/policy/policiesCount')
        if (data.status) {
            this.setState({ data: data.groupedData, isLoaded: true })
        }
    }

    changeFilter = (event) => {
        this.setState({
            filter: event.target.value
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <LottieLoader />
            )
        }
        return (
            <div className="d-flex align-items-center justify-content-center">
                <label>Select Any Region</label>
                <select class="form-select m-4" style={{ width: '10%' }} onChange={this.changeFilter}>
                    <option value="All" selected={this.state.filter === 'All'}>All Regions</option>
                    <option value="North" selected={this.state.filter === 'North'}>North</option>
                    <option value="South" selected={this.state.filter === 'South'}>South</option>
                    <option value="East" selected={this.state.filter === 'East'}>East</option>
                    <option value="West" selected={this.state.filter === 'West'}>West</option>
                </select>
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
            </div>
        );
    }
}
