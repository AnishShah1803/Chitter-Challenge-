import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const Register = ({ submitAction, response }) => {
    let registeredStatus = false;
    const [account, setAccount] = useState({
        firstName: ``,
        secondName: ``,
        username: ``,
        email: ``,
        password: ``
    });
    const updateAccountFields = e => {
        const { id, value } = e.target;
        setAccount({ ...account, [id]: value });
    }
    const submitAccount = (e) => {
        e.preventDefault();
        submitAction(account)
    }
    if (response === "Registration Complete. Please log in.") {
        registeredStatus = true;
    }
    return (
        <>
            {registeredStatus && <Navigate to={'/login'} />}
            <div className="container ">
                <div className="row justify-content-center">
                    <form className="card form col-md-7 p-0" onSubmit={submitAccount}>
                        <div className="card-header bg-primary">Register</div>
                        <div className='card body'>
                            <div className="row justify-content-center mt-2">
                                <div className="form-outline col-md-3 my-4 justify-content-center">
                                    <input type="text" id="firstName" className="form-control" placeholder='First Name' onChange={updateAccountFields} value={account.firstName} required/>
                                    <label className="form-label" htmlFor="firstName">First Name</label>
                                </div>
                                <div className="form-outline col-md-3 my-4 justify-content-center">
                                    <input type="text" id="secondName" className="form-control" placeholder='Second Name' onChange={updateAccountFields} value={account.secondName} required/>
                                    <label className="form-label" htmlFor="secondName">Second Name</label>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className="form-outline col-md-6 my-4">
                                    <input type="text" id="username" className="form-control" placeholder='Username' onChange={updateAccountFields} value={account.username} required />
                                    <label className="form-label" htmlFor="username">Username</label>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className="form-outline col-md-6 my-4">
                                    <input type="email" id="email" className="form-control" placeholder='Email' onChange={updateAccountFields} value={account.email} required />
                                    <label className="form-label" htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className="form-outline col-md-6 my-4 ">
                                    <input type="password" id="password" className="form-control" placeholder='Password' onChange={updateAccountFields} value={account.password} required />
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary btn-block mx-2 my-4 col-lg-2 float-end">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
Register.propTypes = {
    submitAction: PropTypes.func.isRequired,
}

export default Register