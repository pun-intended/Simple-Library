import {React, useState} from "react";

import {Form, FormGroup, Label, Input, Button} from "reactstrap"


function LoginForm({login}) {
    const INITIAL_STATE = {
        username: "",
        password: ""
    }

    const[formData, setFormData] = useState()

    const handleSubmit = (evt) => {
        evt.preventDefault()
        login(formData)
        setFormData(INITIAL_STATE)
    }

    const handleChange = evt => {
        const { name, value } = evt.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }
    return(
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="username"></Label>
            <Input 
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="password"></Label>
            <Input 
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
            />
        </FormGroup> 
        <Button 
            color="primary"
        > 
            Login
        </Button>
    </Form>
    )
}

export default LoginForm