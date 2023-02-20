import { getRedirectResult } from "firebase/auth";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { auth,signInAuthUserWtihEmailPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {SignInContainer,ButtonContainer} from './sign-in-form.styles'
import { emailSignInStart, googleSignInStart } from "../../store/user/user.reducer";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields,[name]:value})
    }

    const clearFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {        
            dispatch(emailSignInStart({email,password}))
            clearFormFields();
        } catch (error) {
            console.log(error)
        } 
    }

    const signInWithGoogle = () => {
        dispatch(googleSignInStart())
      };

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" name="email" type="email" required onChange={handleChange} value={email}/>
                
                <FormInput label="Password" name="password" type="password" required onChange={handleChange} value={password}/>
                
                <ButtonContainer>
                    <Button children='Sign In' type="submit"/>

                    <Button type="button" onClick={signInWithGoogle} children='Google Sign In' buttonType={BUTTON_TYPE_CLASSES.google}/>
                </ButtonContainer>
            </form>
           
            
        </SignInContainer>
    )
}

export default SignInForm;