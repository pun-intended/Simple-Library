import React, { useEffect, useState, useContext } from "react"
import { Button } from "reactstrap"
import LibraryApi from "./api"
import AlertContext from "./AlertContext"

function Landing () {

    // const {alerts, setAlerts, addAlert, removeAlert} = useContext(AlertContext)
    // function handleClick(evt){
    //     console.log("New Alert")
    //     const target = evt.target
    //     addAlert("test alert", target.value)
    // }

    return (
        <div>
            <h2>Welcome to The Library!</h2>
            {/* <Button color="primary" value="primary" onClick={handleClick}>Add Primary Alert</Button>
            <Button color="success" value="success" onClick={handleClick}>Add success Alert</Button>
            <Button color="danger" value="danger" onClick={handleClick}>Add danger Alert</Button> */}
        </div>
    )
}

export default Landing

// TODO - Add links to Books, students