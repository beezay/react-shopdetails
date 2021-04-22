import React from 'react'
import { withRouter } from 'react-router'
import './Dashboard.css'
import Malls from './Malls'
import Shops from './Shops'
const Dashboard = ({history}) => {

    const handleAddNewMall = () => {
        history.push('/addMall');
    }


    return (
        <div className="container-fluid dashboard-wrapper">
            <div className="btn-wrapper">
                <button className="btn-add-mall" onClick={handleAddNewMall} >ADD NEW MALL</button>
            </div>
            <Malls />
            <Shops />
        </div>
    )
}

export default withRouter(Dashboard)
