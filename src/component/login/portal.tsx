// Portal.tsx
// import PaymentForm from '../payment/payment';
import React, { useState } from 'react';
import './portal.css';
import PaymentButton from '../payment/app'
import companyLogo from '../../assets/singpass-login-icon.svg';
function Portal() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const handleLogin = () => {
    const param = {
      client_id: 'GHJxWcqnnxqCHsmVFeTkY1W6I95wtYze',
      response_type: 'code',
      redirect_uri: 'https://heehehooo.netlify.app/callback',
      scope: 'openid',
      state: 'YvgdsJRdtLG3Kla_wqCu9MSKv4OAM0tK8ib2TrawMGE',
      nonce: 'abcdefg123456'
    };
    const requestBody = processSearchParam(param);
    const host = 'https://stg-id.singpass.gov.sg/auth';
    window.location.assign(
      `${host}?${requestBody}`
    );
  };

  const processSearchParam = (p: Record<string, string>) => {
    return new URLSearchParams(p);
  }
  const handleCheckout = () => {
    window.location.href = "https://buy.stripe.com/test_aEU9Eb3IWc8capqaEE";
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="portal-container">
      {loggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <PaymentButton /> 
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button onClick={handleLogin} className="login-button">Log in <span className="hide-on-small"> with <img style={{verticalAlign: "middle"}} src={companyLogo} alt=""/></span></button>
          <button onClick={handleCheckout} className="payment-button">Checkout</button>
          <PaymentButton /> {/* Include the PaymentForm component here */}
        </div>
      )}
    </div>
  );
}

export default Portal;
