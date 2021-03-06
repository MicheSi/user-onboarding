import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('Status has changed', status);
        status && setUsers(users => [...users, status])
    }, [status]);

    return (
        <div className='form-container'>
            <Form>
                <div>
                <label htmlFor='name'>Name: </label>
                <Field
                id='name'
                type='text'
                name='name'/>
                {touched.name && errors.name && (
                    <p className='errors'>{errors.name}</p>
                )}
                </div>
                <div>
                <label htmlFor='email'>Email: </label>
                <Field
                id='email'
                type='text'
                name='email'/>
                {touched.email && errors.email && (
                    <p className='errors'>{errors.email}</p>
                )}
                </div>
                <div>
                <label htmlFor='password'>Password: </label>
                <Field
                id='password'
                type='text'
                name='password'/>
                {touched.password && errors.password && (
                    <p className='errors'>{errors.password}</p>
                )}
                </div>
                <div>
                    <label htmlFor='role'>Role: </label>
                    <Field
                     id='role'
                     className='role-select'
                     as='select'
                     name='role'
                    >
                        <option disabled>Choose an option</option>
                        <option value='Data Scientist'>Data Scientist</option>
                        <option value='Web Developer'>Web Developer</option>
                        <option value='Software Engineer'>Software Engineer</option>
                    </Field>
                    {touched.role && errors.tole && (
                    <p className='errors'>{errors.role}</p>
                )}
                </div>
                <div>
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
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </Form>
            <div className='user-list'>
                <h3>List of Users</h3>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role}</li>
                </ul>
            ))}
            </div>
        </div>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, role, terms}) {
        return {
            name: '',
            email: '',
            password: '',
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        role: Yup.string().oneOf(['Data Scientist', 'Web Developer', 'Software Engineer']).required(),
        terms: Yup.boolean().oneOf([true], "Must accept Terms of Service")
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log('Submitting data', values)
        axios.post('https://reqres.in/api/users', values)
        .then(response => {
            console.log('Successful', response);
            setStatus(response.data);
            resetForm()
        })
        .catch(error => console.log(error.response));
    }
})(NewForm)

export default FormikForm;