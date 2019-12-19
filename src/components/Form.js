import React from 'react';
import { withFormik, Form, Field } from 'formik';

const NewForm = ({values}) => {
    return (
        <div className='form-container'>
            <Form>
                <label htmlFor='name'>Name: </label>
                <Field
                id='name'
                type='text'
                name='name'/>
                <label htmlFor='email'>Email: </label>
                <Field
                id='email'
                type='text'
                name='email'/>
                <label htmlFor='password'>Password: </label>
                <Field
                id='password'
                type='text'
                name='password'/>
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
                </label>
                <button type='submit'>Submit</button>
                

            </Form>
            
        </div>

    )
}

const FormikForm = withFormik({
    mapPropsToValues({name}) {
        return {
            name: ''
        }
    }
})(NewForm)

export default FormikForm;