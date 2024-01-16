import {React, useState} from "react";
import {useNavigate} from "react-router-dom"
import {Form, FormGroup, Label, Input, Button} from "reactstrap"


function LoginForm({login}) {
    const INITIAL_STATE = {
        username: "",
        password: ""
    }
    const navigate = useNavigate()

    const[formData, setFormData] = useState(INITIAL_STATE)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        try{
            login(formData)
            setFormData(INITIAL_STATE)
            navigate("/")
        } catch(e){
            console.log(e)
        }
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
                value={formData.username}
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
                value={formData.password}
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