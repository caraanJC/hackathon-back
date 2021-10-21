import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__head">
          <h4>Login to your account</h4>
          <p>Create a new account</p>
        </div>
        <form className="login__body">
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <button className="btn btn-accent" to="/shop">
            Login
          </button>
        </form>
        <div className="login__body">
          <p className="login__or">or</p>
          <Link className="btn btn-border-accent text-accent-dark" to="/signup">
            Create new Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
