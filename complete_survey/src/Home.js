import React, { useState,useContext } from 'react';
import './App.css';
import {AuthContext } from './context/AuthContext';



const Home = ({onAuthenticate}) => {

 const {dispatch} = useContext(AuthContext);

 async function RegisterUser(event){
  const response = await fetch('http://localhost:3001/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    // handle error here, such as displaying an error message or redirecting to a different page
    console.error(errorData.message);
    return;
  }
  
  const data = await response.json();
  dispatch({type:'LOGIN',payload:data});
  onAuthenticate();
}

async function LoginUser(event){
  const response = await fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    // handle error here, such as displaying an error message or redirecting to a different page
    console.error(errorData.message);
    return;
  }
  
  const data = await response.json();
  dispatch({type:'LOGIN',payload:data});
  onAuthenticate();
}

  
        
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(isRegistering){
        RegisterUser();
    }
    else{
      LoginUser();  
    }
  };

  const toggleMode = () => {
    setUsername('');
    setPassword('')
    setIsRegistering(!isRegistering);
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Survey Home</h1>
      <h2>{isRegistering ? 'Register' : 'Log In'}</h2>

      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={handleUsernameChange} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={handlePasswordChange} />

      <button type="submit">{isRegistering ? 'Register': 'Log In'}</button>

      <p>
        {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
        {' '}
        <button type="button" onClick={toggleMode}>
          {isRegistering ? 'Log In' : 'Register'}
        </button>
      </p>
    </form>
  );
};

export default Home;
