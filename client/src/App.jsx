import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import NavTabs from "./components/NavTabs";
import LocationContext from './context/LocationContext';
import MuralContext from './context/MuralContext';
import DirectionsContext from './context/DirectionsContext';

// NEW auth context provider
import AuthState from './context/auth-v2/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

// page components
import Home from './pages/Home';

// mural API
import muralsAPI from './utils/murals-API';

// import authAPI from './utils/auth-API';

// utils
import history from './components/History';
import { usePosition } from 'use-position';
import { Container } from 'react-bootstrap';

// Loading Screen
import LoadingScreen from './components/Loading';

//
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const [muralState, setMuralState] = useState([]);
  // const plotPoints = [2,5];
  const [directionsState, setDirectionsState] = useState([]);
  // const [userState, setUserState] = useState();

  const plotCall = (points) => {
    setDirectionsState(points);
    console.log(directionsState);
  };

  useEffect(() => {
    // get the murals from the api
    muralsAPI.getMurals().then((data) => {
      setMuralState(data);
    });
  }, []);

  const position = usePosition();

  return (
    <>
      <AuthState>
        <AlertState>
          {loading === false ? (
            <MuralContext.Provider value={muralState}>
              <LocationContext.Provider value={position}>
                <DirectionsContext.Provider
                  value={{
                    directionsValue: [directionsState],
                    plotValue: [plotCall]
                  }}
                >
                  <Router history={history}>
                    <Container fluid>
                      <Route path="/" component={Home} />
                    </Container>
                  </Router>
                </DirectionsContext.Provider>
              </LocationContext.Provider>
            </MuralContext.Provider>
          ) : (
            <LoadingScreen />
          )}
        </AlertState>
      </AuthState>
    </>
  );
};

export default App;
