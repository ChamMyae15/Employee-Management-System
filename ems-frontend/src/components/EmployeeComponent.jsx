import React, { use, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate , useParams}  from 'react-router-dom';
import { useEffect } from 'react';

export const EmployeeComponent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if(id) {
            getEmployeeById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log(error);
            })
        }

    },[id])

    
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if(validateForm()){
            const employee = { firstName, lastName, email };
            console.log(employee);

            if(id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error=> {
                    console.log(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.log(error);
                });
            }

        }
        
    };

    function validateForm(){
        let valid = true;
        const errorsCopy = { ...errors };

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>;
        }
        return <h2 className='text-center'>Add Employee</h2>;
    }
  return (
    <div className='container'>
        <br />  <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name : </label>
                            <input
                                type="text"
                                name='firstName'
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                placeholder='Eg: John...'
                                value={firstName}
                                onChange={(e) => {setFirstName(e.target.value)}}
                            />
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name : </label>
                            <input
                                type="text"
                                name='lastName'
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                placeholder='Eg: Doe...'
                                value={lastName}
                                onChange={(e) => {setLastName(e.target.value)}}
                            />
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email : </label>
                            <input
                                type="email"
                                name='email'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder='Eg: john.doe@example.com...'
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                            {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save Employee</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
