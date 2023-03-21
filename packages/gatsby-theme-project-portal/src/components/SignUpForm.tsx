import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Label from "./Label";
import axios from "axios";

interface FormValues {
    email: string;
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
});

export const SignUpForm = () => {
    const submitForm = async (values: FormValues, formik: FormikHelpers<FormValues>) => {
        console.log(values);
        const { email } = values;
        try {
            const payload = {
                email_address: email,
            };

            await axios.post('/.netlify/functions/add-email-subscriber', payload);
            alert('You successfully subscribed!');
            formik.resetForm();
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <Formik
                initialValues={{ email: "" }}
                validationSchema={SignupSchema}
                onSubmit={submitForm}
            >
                {(formik) => (
                    <Form className="w-96 bg-gray-50 p-4 flex flex-col items-center shadow-sm">
                        <h2 className="text-center text 2xl font-bold">
                            Join our newsletter!
                        </h2>
                        <a className="text-center">
                            Receive important updates via email to learn about new projects and opportunities.
                        </a>
                        <a className="text-center">
                            No spam, unsubscribe at anytime.
                        </a>
                        <div className="w-72 my-2 flex flex-col">
                            <Label text="Email" required={true} htmlFor="email" />
                            <Field
                                id="email"
                                className="p-2 border-2 border-gray-400"
                                name="email"
                            ></Field>
                            <ErrorMessage
                                component="div"
                                className="text-red-700"
                                name="email"
                            />
                        </div>
                        <button
                            disabled={!formik.isValid || !formik.dirty}
                            type="submit"
                            className="disabled:opacity-50 my-2 px-4 py-2 bg-blue-900 text-white transition-all duration-300 w-fit"
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};
