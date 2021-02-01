import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationContext from "./context/LocationContext";
import MuralContext from "./context/MuralContext";
import { AuthProvider } from "./context/AuthContext";
import muralsAPI from "./utils/murals-API";
import history from "./components/History";
// import authAPI from './utils/auth-API';
import { usePosition } from "use-position";
import { Container } from "react-bootstrap";

const App = () => {
	const [muralState, setMuralState] = useState([]);
	// const [userState, setUserState] = useState();

	useEffect(() => {
		// // check for a currently logged in user from the api
		// authAPI.getCurrentUser().then((data) => {
		//   // if the check comes back as a success, then set the userState object to the logged in user and set isAuthenticated to true
		//   if (data.status === 200) {
		//     setUserState({ data, isAuthenticated: true });
		//   }
		//   // otherwise, set isAuthenticated to false
		//   else {
		//     setUserState({ isAuthenticated: false });
		//   }
		// });

		// get the murals from the api
		muralsAPI.getMurals().then((data) => {
			setMuralState(data);
		});
	}, []);

	const position = usePosition();

	return (
		<AuthProvider>
			<MuralContext.Provider value={muralState}>
				<LocationContext.Provider value={position}>
					<Router history={history}>
						<Container fluid>
							<Route path="/" component={Home} />
						</Container>
					</Router>
				</LocationContext.Provider>
			</MuralContext.Provider>
		</AuthProvider>
	);
};

export default App;
