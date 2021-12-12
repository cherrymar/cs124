import React, { useEffect } from 'react'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import { connect } from 'react-redux'

import * as actions from '../../backend/store/actions'
import SignUpSchema from './SignUpSchema';

const SignUpForm = ({ signUp, loading, error, cleanUp }) => {
    let displayError

    if (error) {
        displayError = {display: "block"}
    } else {
        displayError = {display: "none"}
    }

    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [cleanUp])

    return (
        <>
        <Formik
            initialValues = {{
                // firstName: "",
                // lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema = {SignUpSchema}
            onSubmit = {async ( values, { resetForm, setSubmitting }) => {
                await signUp(values)
                resetForm()
                setSubmitting(false)
            }}
        >
        {({ errors, touched, isSubmitting }) => (
        <Form className = "classic-form">
            <div className = {["text-input", touched.firstName && errors.firstName && "text-error"].join(' ')}> 
                <label> First name </label> <br />
                <Field name = "firstName" type = "text"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "firstName" />
            </div>

            <div className = {["text-input", touched.lastName && errors.lastName && "text-error"].join(' ')}> 
                <label> Last name </label> <br />
                <Field name = "lastName" type = "text"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "lastName" />
            </div>

            <div className = {["text-input", touched.username && errors.username && "text-error"].join(' ')}> 
                <label> Username </label> <br />
                <Field name = "username" type = "text"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "username" />
            </div>
            
            <div className = {["text-input", touched.email && errors.email && "text-error"].join(' ')}> 
                <label> Email </label> <br />
                <Field name = "email" type = "email"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "email" />
            </div>
            
            <div className = {["text-input", touched.password && errors.password && "text-error"].join(' ')}>
                <label> Password </label> <br />
                <Field name = "password" type = "password"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "password" />
            </div>

            <div className = {["text-input", touched.confirmPassword && errors.confirmPassword && "text-error"].join(' ')}>
                <label> Confirm Password </label> <br />
                <Field name = "confirmPassword" type = "password"/> <br/>
                <ErrorMessage render = {msg => <p className = "error-msg"> {msg} </p>} name = "confirmPassword" />
            </div>



            <p style = {displayError}>{error}</p>
            <button type = "submit" disabled = {isSubmitting} className = "classic-button"> Sign Up </button>
        
        
        </Form>
        )}
        </Formik>
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
    loading: auth.loading,
    error: auth.error,
})

const mapDispatchToProps = {
    signUp: actions.signUp,
    cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
