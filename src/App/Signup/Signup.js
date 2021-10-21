const Signup = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__head">
          <h4>Sign up for free</h4>
          <p>Login or create a new account</p>
        </div>
        <form className="login__body">
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />
          </div>
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <div className="input">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confim-password" />
          </div>
          <button className="btn btn-accent">Create new Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
