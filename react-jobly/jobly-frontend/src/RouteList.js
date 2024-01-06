// ***/ :*** Homepage — just a simple welcome message

// ***/companies :*** List all companies

// ***/companies/apple :*** View details of this company

// ***/jobs :*** List all jobs

// ***/login :*** Login/signup

// ***/signup :*** Signup form

// ***/profile :*** Edit profile page
import React, { useState }from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';

function RouteList() {
    
    const INITIAL_STATE = []

    const func = (data) => {
        const newColor = {name: data.name, rgb: data.color}
        setColors([...colors, newColor])
    }

    const [colors, setColors] = useState(INITIAL_STATE)

    return (
        <Routes>
            <Route exact path="/companies/:handle" element={<JobList handle={handle}/>} />
            <Route exact path="/companies" element={<CompanyList companies={companies}/>} />
            <Route exact path="/jobs" element={<JobList />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/" element={<Landing />} />
        </Routes>
    );
}

export default RouteList