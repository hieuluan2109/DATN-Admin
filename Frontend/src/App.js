import React from 'react';
import './App.css';
import './css/login.css';
import LoginForm from './component/Login/Login_Form'
function App() {
  return (
    <div className="Login">
      <div className="row">
        <div className="col span-2-of-3">
         
        </div>
        <div className="col span-1-of-3">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default App;
