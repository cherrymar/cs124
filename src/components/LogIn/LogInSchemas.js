import * as Yup from 'yup'

const LogInSchema = Yup.object().shape({
    email: Yup.string("Must be a valid email").email("Must be a valid email").required("Please enter your email"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Please enter your password"),
})

export default LogInSchema;