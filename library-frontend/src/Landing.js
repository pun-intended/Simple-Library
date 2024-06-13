import React, { useEffect, useState, useContext } from "react"
import { Button } from "reactstrap"
import LibraryApi from "./api"
import AlertContext from "./AlertContext"

const Landing = ({setToken}) => {

        function handleClick(evt){
            console.log("token chosen")
            const target = evt.target
    
            setToken(target.value)
        }
    
        return (
            <div>
                <h2>Welcome to The Library!</h2>
                <Button color="primary" value={user} onClick={handleClick}>User</Button>
                <Button color="secondary" value={admin} onClick={handleClick}>Admin</Button>
            </div>
        )
    }
    // Dev
    // let user = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDEsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTE2MjM5MDIyfQ.o7FLElxzQ2rSoTboMXB-zOVOfIBT4z_qYBMVV_xHvNc`
    // let admin = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.f5hMoreRwO94IBwRYJFFWb9dbxMKIkimi1VluwW_QM8`
    
    //Demo
    // 6695b3afa0b10c858d63789372534a5f
    let user = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDEsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTE2MjM5MDIyfQ.LcKc9HcruW68Q3jbcnrEwuwvzu31MDHl2BLJLQdSTU8`
    let admin = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.0ShJ-JgKDHVNSuqdUS_DwWm8KO1BQj6OxW7N_nQ7CHQ`
    

export default Landing