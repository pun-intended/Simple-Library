import {React, useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"


function UserProfile({user, patchUser}) {
    
    console.log(user)
    const INITIAL_STATE = user

    const[formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        patchUser(formData)
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
                disabled
                value={`${formData.username}`}
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="first_name" ></Label>
            <Input 
                id="first_name"
                name="firstName"
                value={`${formData.firstName}`}
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="last_name" ></Label>
            <Input 
                id="last_name"
                name="lastName"
                value={`${formData.lastName}`}
                type="text"
                onChange={handleChange}
            />
        </FormGroup> 
        <FormGroup>
            <Label for="email" ></Label>
            <Input 
                id="email"
                name="email"
                value={`${formData.email}`}
                type="email"
                onChange={handleChange}
            />
        </FormGroup>
        <Button 
            color="primary"
        > 
            Update
        </Button>
    </Form>
    )
}

export default UserProfile