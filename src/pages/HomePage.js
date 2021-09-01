import axios from "axios";
import React from "react";
import EditPolicyDetails from "../components/EditPolicy";
import { toast } from 'react-toastify';

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            searchBy: null,
            policyId: null,
            customerId: null,
            isLoaded: true,
            data: {}
        }
    }

    fetchPolicyDetailsById = async () => {
        const id = this.state.customerId || this.state.policyId;
        this.setState({
            isLoaded: false
        })
        if (id && this.state.searchBy) {
            const { data } = await axios.get(`http://localhost:8080/${this.state.searchBy}/search/${id}`)
            if (data.details.length) {
                this.setState({
                    data: data.details[0],
                    policyId: null,
                    customerId: null,
                    editScreen: true,
                    isLoaded: true
                })
            } else {
                this.setState({
                    isLoaded: true
                })
                toast.error('No data found with id', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    onChangePolicyId = (e) => {
        this.setState({
            searchBy: 'policy',
            policyId: e.target.value,
            customerId: null
        })
    }

    onChangeCustomerId = (e) => {
        this.setState({
            searchBy: 'customer',
            policyId: null,
            customerId: e.target.value
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="home">
                    <div class="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row mt-4 justify-content-between">
                        <div className="home" style={{ width: '30%' }}>
                            <span className="mb-4 p-3 heading">Check your Policy details using</span>
                            <div class="input-group mb-3" style={{ width: 400 }}>
                                <input type="number" class="form-control" placeholder="Enter your Policy No" aria-label="Enter your Policy No" aria-describedby="button-addon2" onChange={this.onChangePolicyId} value={this.state.policyId} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.fetchPolicyDetailsById}>Search</button>
                            </div>
                            <p>OR</p>
                            <div class="input-group mb-3" style={{ width: 400 }}>
                                <input type="number" class="form-control" placeholder="Enter your Customer No" aria-label="Enter your Customer No" aria-describedby="button-addon2" onChange={this.onChangeCustomerId} value={this.state.customerId} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.fetchPolicyDetailsById}>Search</button>
                            </div>
                        </div>
                        <div class="col-7 modalbg p-4 d-flex" style={{ width: '60%', flexDirection: 'column' }}>
                            {
                                this.state.data.policy_id ? <React.Fragment>
                                    <span className="m-4">Your Policy Details - <span className="policyId">{this.state.data.policy_id}</span></span>
                                    <EditPolicyDetails policyDetails={this.state.data} />
                                </React.Fragment> : <span style={{ fontSize: 20 }}>
                                    Search for your policy to view or edit
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;