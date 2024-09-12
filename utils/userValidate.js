const Yup = require("yup");

const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field!!"),
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
            message: "Enter a valid email",
        })
        .required("Email is a required field!!"),
    password: Yup.string()
        .min(3)
        .max(20)
        .required("Password is a required field")
        .matches(/o+/, "Password should include o"),
});

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
            message: "Enter a valid email",
        })
        .required("Email is a required field!!"),
    password: Yup.string()
        .min(3)
        .max(20)
        .required("Passwrod is a required field")
        .matches(/o+/, "Password should include o"),
});

module.exports = { registerValidationSchema, loginValidationSchema };
