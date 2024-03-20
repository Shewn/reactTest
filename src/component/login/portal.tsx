// Portal.tsx
// import PaymentForm from '../payment/payment';
import React, { useState } from 'react';
import './portal.css';
import PaymentButton from '../payment/app'
function Portal() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const handleLogin = () => {
    // Simulate authentication
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

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
          <button onClick={handleLogin} className="login-button">Login</button>
          <button onClick={handleCheckout} className="payment-button">Checkout</button>
          <PaymentButton /> {/* Include the PaymentForm component here */}
        </div>
      )}
    </div>
  );
}

export default Portal;
