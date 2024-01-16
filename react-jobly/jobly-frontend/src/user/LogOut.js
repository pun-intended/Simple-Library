import React  from "react";
import {Navigate} from "react-router-dom"

const LogOut = ({logout}) => {
    logout()

    return(
        // TODO - Find way to logout
        <Navigate to="/" />
    )
}

export default LogOut