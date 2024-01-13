import {React, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"


function SignupForm({signup}) {

    const INITIAL_STATE = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    }
    // TODO - signup method throwing error "Cannot read properties of undefined (data - api.request->api.register->signup"
    const[formData, setFormData] = useState()

    const handleSubmit = (evt) => {
        evt.preventDefault()
        signup(formData)
        setFormData(INITIAL_STATE)
    }

    const handleChange = evt => {
        const { name, value } = evt.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    return (
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label for="username"></Label>
            <Input 
                id="username"
                name="username"
                placeholder="username"
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="first_name" ></Label>
            <Input 
                id="first_name"
                name="firstName"
                placeholder="First Name"
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="last_name" ></Label>
            <Input 
                id="last_name"
                name="lastName"
                placeholder="Last Name"
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="email" ></Label>
            <Input 
                id="email"
                name="email"
                placeholder="Email Address"
                type="email"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="password" ></Label>
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
            Signup
        </Button>
    </Form>
    )
}

export default SignupForm