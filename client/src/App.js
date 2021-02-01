import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import NavTabs from "./components/NavTabs";
import LocationContext from './context/LocationContext';
import MuralContext from './context/MuralContext';

// NEW auth context provider
import AuthState from './context/auth-v2/AuthState';
import AlertState from './context/alert/AlertState';

// page components
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// OLD auth context provider
// import { AuthProvider } from './context/AuthContext';

// mural API
import muralsAPI from './utils/murals-API';

// import authAPI from './utils/auth-API';

// utils
import history from './components/History';
import { usePosition } from 'use-position';
import { Container } from 'react-bootstrap';

const App = () => {
  const [muralState, setMuralState] = useState([]);
  // const [userState, setUserState] = useState();

  useEffect(() => {
    // get the murals from the api
    muralsAPI.getMurals().then((data) => {
      setMuralState(data);
    });
  }, []);

  const position = usePosition();

  return (
    <AuthState>
      <AlertState>
        {/* <AuthProvider> */}
        <MuralContext.Provider value={muralState}>
          <LocationContext.Provider value={position}>
            <Router history={history}>
              <Container fluid>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Container>
            </Router>
          </LocationContext.Provider>
        </MuralContext.Provider>
        {/* </AuthProvider> */}
      </AlertState>
    </AuthState>
  );
};

export default App;
