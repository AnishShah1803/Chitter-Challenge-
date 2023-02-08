import { useState } from "react";
import { Navigate } from 'react-router-dom';
const Login = ({ submitAction, response }) => {
    let loginStatus;
    const [login, setLogin] = useState({
        email: ``,
        password: ``,
    });
    const updateLoginFields = e => {
        const { id, value } = e.target;
        setLogin({ ...login, [id]: value });
    }
    const submitLogin = (e) => {
        e.preventDefault();
        submitAction(login)
    }
    if (response === "Login Success") {
        loginStatus = true;
    }
  return (
        <>
            {loginStatus && <Navigate to={'/'} />}
            <div className="container ">
                <div className="row justify-content-center">
                    <form className="card form col-md-7 p-0" onSubmit={submitLogin}>
                        <div className="card-header bg-primary">Log in</div>
                            <div className='card-body'>
                                <div className='row justify-content-center'>
                                    <div className="form-outline col-md-6 my-5">
                                        <input type="email" id="email" className="form-control" placeholder='Email' onChange={updateLoginFields} value={login.email} required />
                                        <label className="form-label" htmlFor="email">Email</label>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className="form-outline col-md-6 my-5">
                                        <input type="password" id="password" className="form-control" placeholder='Password' onChange={updateLoginFields} value={login.password} required />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-block mx-2 m-5 col-lg-2 float-end">Login</button>
                                </div>
                            </div>
                        </form>
                  </div>
            </div>
        </>

  )
}

export default Login