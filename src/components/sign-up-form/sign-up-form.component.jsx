import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuthUserWithEmailPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {SignUpContainer} from './sign-up-form.styles.jsx'
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields,[name]:value})
    }

    const clearFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword){
            alert("Passwords do not match")
            return;
        }
        try {
            dispatch(signUpStart(email,password,displayName))
            clearFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use'){
                alert("Account with email already created", error)
            }
            return;
        }
        
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" name="displayName" type="text" required onChange={handleChange} value={displayName}/>

                <FormInput label="Email" name="email" type="email" required onChange={handleChange} value={email}/>
                
                <FormInput label="Password" name="password" type="password" required onChange={handleChange} value={password}/>

                <FormInput label="Confirm Password" name="confirmPassword" type="password" required onChange={handleChange} value={confirmPassword}/>
                
                <Button children='Sign Up' type="submit"/>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;