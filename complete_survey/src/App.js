import React, { useState } from 'react';
import Home from './Home';
import SurveyForm from './SurveyForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated && <Home onAuthenticate={handleAuthentication} />}
      {isAuthenticated && <SurveyForm />}
    </div>
  );
}

export default App;
