import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
})

export const categorySchema = yup.object().shape({
    name: yup.string().required("title is required")
})

export const postSchema = yup.object().shape({
    id: yup
        .number()
        .nullable()
        .default(null),
    title: yup
        .string()
        .nullable()
        .default(null),
    content: yup
        .string()
        .nullable()
        .default(null),
    categoryId: yup
        .number()
        .nullable()
        .default(null)
})