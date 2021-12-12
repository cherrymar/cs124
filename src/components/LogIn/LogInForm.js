import React, { useEffect } from 'react'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import { connect } from 'react-redux'

import * as actions from '../../backend/store/actions'
import LogInSchema from './LogInSchemas'

const LogInForm = ({ logInEmail, logInGoogle, loading, error, cleanUp }) => {
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
          email: "",
          password: "",
        }}
        validationSchema = {LogInSchema}
        onSubmit = {async ( values, { resetForm, setSubmitting }) => {
          await logInEmail(values)
          resetForm()
          setSubmitting(false)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className = "classic-form">
              
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

            <p style = {displayError}>{error}</p>
            <button type = "submit" disabled = {isSubmitting} className = "classic-button"> Log In </button>

          </Form>
        )}
      </Formik>


      <button onClick={() => logInGoogle()}>Login with Google</button>
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
})

const mapDispatchToProps = {
  logInEmail: actions.logInEmail,
  logInGoogle: actions.logInGoogle,
  cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)
