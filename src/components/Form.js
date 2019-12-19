import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const NewForm = ({values, errors, touched}) => {
    return (
        <div className='form-container'>
            <Form>
                <label htmlFor='name'>Name: </label>
                <Field
                id='name'
                type='text'
                name='name'/>
                {touched.name && errors.name && (
                    <p className='errors'>{errors.name}</p>
                )}
                <label htmlFor='email'>Email: </label>
                <Field
                id='email'
                type='text'
                name='email'/>
                {touched.email && errors.email && (
                    <p className='errors'>{errors.email}</p>
                )}
                <label htmlFor='password'>Password: </label>
                <Field
                id='password'
                type='text'
                name='password'/>
                {touched.password && errors.password && (
                    <p className='errors'>{errors.password}</p>
                )}
                <label
                 className='checkbox'
                 htmlFor='terms'>
                 Terms of Service
                 <Field
                  id='terms'
                  type='checkbox'
                  name='terms'
                  checked={values.terms}
                 />
                 {touched.terms && errors.terms && (
                    <p className='errors'>{errors.terms}</p>
                )}
                </label>
                <button type='submit'>Submit</button>
                

            </Form>
            
        </div>

    )
}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password}) {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        terms: Yup.boolean().oneOf([true], "Must accept Terms of Service")
    })
})(NewForm)

export default FormikForm;