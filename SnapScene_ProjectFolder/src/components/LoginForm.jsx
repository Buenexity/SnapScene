import React, { useState } from 'react';

function LoginForm() 
{
  const [CreateAccount, setCreateAccount] = useState(false);

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white', borderRadius: '2.5%' }}>
      <div className="col-md-6 col-lg-7 d-flex align-items-center">
        <div className="card-body p-4 p-lg-5 text-black">

          <form>
            <div className="d-flex align-items-center mb-3 pb-1">
              <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
              <div className="h1 fw-bold mb-0" style={{ marginLeft: '-18px' }}>SnapScene</div>
            </div>

            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
              {CreateAccount ? 'Create account' : 'Sign into your account'}
            </h5>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="form2Example17" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="form2Example17">
                Email address
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="form2Example27" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="form2Example27">Password</label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-dark btn-lg btn-block" type="button">
                {CreateAccount ? 'Create Account' : 'Login'}
              </button>
            </div>

            <a className="small text-muted" href="#!">Forgot password?</a>

            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
              {CreateAccount ? 'Already have an Account:' : 'Don\'t have an Account:'}
              <a onClick={() => setCreateAccount(!CreateAccount)} href="#!" style={{ color: '#393f81', marginLeft: '5px' }}>
                {console.log(CreateAccount)}
                {CreateAccount ? 'Sign In' : 'Create Account'}
              </a>
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}

export default LoginForm;
