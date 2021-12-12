import * as Yup from 'yup'
/*
const LogInSchema = Yup.object().shape({
    email: Yup.string("Must be a valid email").email("Must be a valid email").required("Please enter your email"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Please enter your password"),
})

*/
const SignUpSchema =
    Yup.object().shape({
        firstName:
            Yup.string("Must be a valid name")
            .required("Please enter your name"),

        lastName:
            Yup.string("Must be a valid name"),

        username:
            Yup.string("Must be a valid username")
            .min(4, "Username must be at least 4 characters")
            .required("Please enter a username"),

        email:
            Yup.string("Must be a valid email")
            .email("Must be a valid email")
            .required("Please enter an email"),

        password: 
            Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Please enter a password"),

        confirmPassword:
            Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
            .required("Make sure you can remember your password!")
    });

export default SignUpSchema;