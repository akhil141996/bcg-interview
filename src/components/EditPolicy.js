import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

function EditPolicyDetails(props) {
    const {
        bodily_injury_liability,
        collision,
        comprehensive,
        customer_id,
        date_of_purchase,
        fuel,
        gender,
        income,
        marital_status,
        personal_injury_protection,
        policy_id,
        premium,
        property_damage_liability,
        region,
        vehicle_segment
    } = props.policyDetails;

    let month = new Date(date_of_purchase).getMonth() + 1
    const validMonth = month < 10 ? `0${month}` : month

    let day = new Date(date_of_purchase).getDate();
    const validDate = day < 10 ? `0${day}` : day
    const date = `${new Date(date_of_purchase).getFullYear()}-${validMonth}-${validDate}`

    const [isDisabled, setDisabled] = useState(true);
    const [bodilyInjuryLiability, setBodilyInjuryLiability] = useState(bodily_injury_liability)
    const [collisionValue, setCollisionValue] = useState(collision)
    const [comprehensiveValue, setComprehensiveValue] = useState(comprehensive)
    const [fuelValue, setFuelValue] = useState(fuel)
    const [genderValue, setGenderValue] = useState(gender)
    const [incomeRange, setIncomeRange] = useState(income)
    const [personalInjuryProtection, setPersonalInjuryProtection] = useState(personal_injury_protection)
    const [premiumValue, setPremiumValue] = useState(premium)
    const [propertyDamage, setPropertyDamage] = useState(property_damage_liability)
    const [regionValue, setRegionValue] = useState(region)
    const [vehicleSegment, setVehicleSegment] = useState(vehicle_segment)
    const [maritalStatus, setMaritalStatus] = useState(marital_status)
    const [isInvalid, setPremiumInvalid] = useState(false)

    const savePolicy = async (event) => {
        event.preventDefault();
        if (!isInvalid) {
            const payload = {
                policy: {
                    bodily_injury_liability: bodilyInjuryLiability,
                    collision: collisionValue,
                    comprehensive: comprehensiveValue,
                    customer_id,
                    date_of_purchase: new Date(date_of_purchase).toISOString().slice(0, 19).replace('T', ' '),
                    fuel: fuelValue,
                    personal_injury_protection: personalInjuryProtection,
                    policy_id,
                    premium: premiumValue,
                    property_damage_liability: propertyDamage,
                    vehicle_segment: vehicleSegment
                },
                customer: {
                    customer_id,
                    gender: genderValue,
                    income: incomeRange,
                    marital_status: maritalStatus,
                    region: regionValue,
                }
            }

            const result = await axios.post('http://localhost:8080/policy/save', payload)
            if (!result.data.status) {
                toast.error('Error saving details', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast.success('Successfully updated policy details', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            setDisabled(true)
        } else {
            toast.error('Premium value is more than 10,00,000', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <div className="container" onSubmit={savePolicy}>
            <form class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Policy Id</label>
                    <input type="text" class="form-control" defaultValue={policy_id} disabled />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Customer Id</label>
                    <input type="text" class="form-control" defaultValue={customer_id} disabled />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Date of Purchase</label>
                    <input type="date" class="form-control" value={date} disabled />
                </div>
                <div class="col-md-6">
                    <label class="form-label">Premium</label>
                    <input id="validationFeedback" type="number" required class={`form-control ${isInvalid ? 'is-invalid' : ''}`} defaultValue={premiumValue} disabled={isDisabled} onChange={(e) => {
                        if (Number(e.target.value) > 1000000) {
                            setPremiumInvalid(true)
                        } else {
                            setPremiumInvalid(false)
                        }
                        setPremiumValue(e.target.value)
                    }} />
                    <div id="validationFeedback" class="invalid-feedback">
                        Please enter number less than 10,00,000.
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Vehicle Segment</label>
                    <input type="text" class="form-control" defaultValue={vehicleSegment} disabled={isDisabled} onChange={(e) => setVehicleSegment(e.target.value)} />
                </div>
                <div class="col-md-4">
                    <label class="form-label">Fuel</label>
                    <select class="form-select" required disabled={isDisabled} onChange={(e) => setFuelValue(e.target.value)}>
                        <option value="CNG" selected={fuelValue === 'CNG'}>CNG</option>
                        <option value="LPG" selected={fuelValue === 'LPG'}>LPG</option>
                        <option value="Diesel" selected={fuelValue === 'Diesel'}>Diesel</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Region</label>
                    <select class="form-select" required disabled={isDisabled} onChange={(e) => setRegionValue(e.target.value)}>
                        <option value="North" selected={regionValue === 'North'}>North</option>
                        <option value="South" selected={regionValue === 'South'}>South</option>
                        <option value="East" selected={regionValue === 'East'}>East</option>
                        <option value="West" selected={regionValue === 'West'}>West</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Income Range</label>
                    <select class="form-select" required disabled={isDisabled} onChange={(e) => setIncomeRange(e.target.value)}>
                        <option value="0- $25K" selected={incomeRange === "0- $25K"}>0- $25K</option>
                        <option value="$25K-$75K" selected={incomeRange === "$25K-$75K"}>$25K-$75K</option>
                        <option value=">$75K" selected={incomeRange === ">$75K"}>{'>$75K'}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Gender</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="Male" checked={genderValue === 'Male'} disabled={isDisabled} onChange={(e) => setGenderValue(e.target.value)} />
                        <label class="form-check-label">Male</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="Female" checked={genderValue === 'Female'} disabled={isDisabled} onChange={(e) => setGenderValue(e.target.value)} />
                        <label class="form-check-label">Female</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Marital Status</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="1" checked={maritalStatus === '1'} disabled={isDisabled} onChange={(e) => setMaritalStatus(e.target.value)} />
                        <label class="form-check-label">Married</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="0" checked={maritalStatus === '0'} disabled={isDisabled} onChange={(e) => setMaritalStatus(e.target.value)} />
                        <label class="form-check-label">Single</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Bodily Injury Liability</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={1} checked={bodilyInjuryLiability === 1} disabled={isDisabled} onChange={(e) => setBodilyInjuryLiability(Number(e.target.value))} />
                        <label class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={0} checked={bodilyInjuryLiability === 0} disabled={isDisabled} onChange={(e) => setBodilyInjuryLiability(Number(e.target.value))} />
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Collision</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={1} checked={collisionValue === 1} disabled={isDisabled} onChange={(e) => setCollisionValue(Number(e.target.value))} />
                        <label class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={0} checked={collisionValue === 0} disabled={isDisabled} onChange={(e) => setCollisionValue(Number(e.target.value))} />
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Comprehensive</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={1} checked={comprehensiveValue === 1} disabled={isDisabled} onChange={(e) => setComprehensiveValue(Number(e.target.value))} />
                        <label class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={0} checked={comprehensiveValue === 0} disabled={isDisabled} onChange={(e) => setComprehensiveValue(Number(e.target.value))} />
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Property Damage Liability</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={1} checked={propertyDamage === 1} disabled={isDisabled} onChange={(e) => setPropertyDamage(Number(e.target.value))} />
                        <label class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={0} checked={propertyDamage === 0} disabled={isDisabled} onChange={(e) => setPropertyDamage(Number(e.target.value))} />
                        <label class="form-check-label">No</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Personal Injury Protection</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={1} checked={personalInjuryProtection === 1} disabled={isDisabled} onChange={(e) => setPersonalInjuryProtection(Number(e.target.value))} />
                        <label class="form-check-label">Yes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value={0} checked={personalInjuryProtection === 0} disabled={isDisabled} onChange={(e) => setPersonalInjuryProtection(Number(e.target.value))} />
                        <label class="form-check-label">No</label>
                    </div>
                </div>

                {isDisabled ? <div class="col-12">
                    <button class="btn btn-primary" type="button" onClick={(event) => { event.preventDefault(); setDisabled(false) }}>Edit Policy</button>
                </div> : <div class="col-12">
                    <button class="btn btn-danger" type="button" onClick={(event) => { event.preventDefault(); setDisabled(true) }}>Cancel</button>
                    <button class="btn btn-primary m-2" disabled={isInvalid} type="submit">Save Policy</button>
                </div>}
            </form>
        </div>
    )
}

export default EditPolicyDetails;