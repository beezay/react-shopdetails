import React from 'react'
import './Dashboard.css'
import Malls from './Malls'
import Shops from './Shops'
const Dashboard = () => {
    return (
        <div className="container-fluid dashboard-wrapper">
            <div className="btn-wrapper">
                <button className="btn-add-mall">ADD NEW MALL</button>
            </div>
            <Malls />
            <Shops />
        </div>
    )
}

export default Dashboard
