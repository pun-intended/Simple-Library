import {React, useState} from "react";
import {useNavigate} from "react-router-dom"
import {Form, FormGroup, Label, Input, Container, Button} from "reactstrap"

const LoginForm = ({login}) => {
    
    const INITIAL_STATE = {
        id: "",
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
    <Container className="LoginForm" >
        <Form onSubmit={handleSubmit} >
            <FormGroup > 
                <Label for="id">ID</ Label>
                <Input id="id"
                    name="id"
                    placegolder="ID"
                    type="text"
                    onChange={handleChange} 
                    value={formData.id}
                    />
                <Label for="password">Password</Label>
                <Input id="password"
                    name="password"
                    placegolder="Password"
                    type="password"
                    onChange={handleChange} 
                    value={formData.password} />
            </FormGroup>
            <Button>Login</Button>
        </Form>
    </Container>
    )
}

export default LoginForm;