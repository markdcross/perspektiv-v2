import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import Mapbucket from "../components/Mapbucket";
import UserLogin from "../components/UserLogin";
import UserCreateAcct from "../components/UserCreateAcct";
import ScrollContent from "../components/ScrollContent";
import MuralContent from "../components/MuralContent";
import RestaurantContent from "../components/RestaurantContent";
import NavMobile from "../components/NavMobile";
import { useMediaQuery } from "react-responsive";
import Sheet from "react-modal-sheet";
import AuthContext from "../context/auth-v2/authContext";
import ProgressContext from "../context/ProgressContext";
import DistanceResetButton from "../components/DistanceResetButton";
import ProgressState from "../context/ProgressState";

function Home() {
	const authContext = useContext(AuthContext);

	//Desktop and Mobile are used to control what is rendered at differnt widths
	const Desktop = ({ children }) => {
		const isDesktop = useMediaQuery({ minWidth: 768 });
		return isDesktop ? children : null;
	};
	const Mobile = ({ children }) => {
		const isMobile = useMediaQuery({ maxWidth: 767 });
		return isMobile ? children : null;
	};

	//Route path information
	let { path } = useRouteMatch();

	const progressContext = useContext(ProgressContext);
	// const { loadUserMurals } = progressContext;

	// //These states are used to prevent the RankUp modal from re-rendering on resize and to control it's events
	// const [progressControl, setProgressControl] = useState(1);
	// const [modalShow, setModalShow] = useState(false);
	// const [resetState, setResetState] = useState(1);
	// // const [boostState, setBoostState] = useState(0);

	// const timeout = delay => {
	//   return new Promise(res => setTimeout(res, delay));
	// };

	// const timerXP = () => {
	//   setBoostState(1);
	//   setResetState(0);
	//   timeout(1000).then(modalProg).then(modalPop);
	//   console.log('Timer has run');
	// };

	// const levelReset = () => {
	//   setProgressControl(1);
	//   setResetState(1);
	//   setBoostState(0);
	// };

	// const modalProg = () => {
	//   setProgressControl(0);
	// };

	// const modalPop = () => {
	//   setModalShow(true);
	// };

	//Used for Mobile view page control
	//eslint-disable-next-line
	const [isOpen, setOpen] = useState(true);
	const [topSnap, setTopSnap] = useState(1);

	const topCall = (top) => {
		setTopSnap(top);
	};

	// // Screensize detection for mobile view
	// const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;

	console.log(height);
	// 	return {
	// 		width,
	// 		height,
	// 	};
	// };

	// getWindowDimensions();

	// const [windowDimensions, setWindowDimensions] = useState(
	//   getWindowDimensions()
	// );

	useEffect(() => {
		// if there is a current user, load their information in state
		authContext.loadUser();
		// loadUserMurals();

		// function handleResize() {
		//   setWindowDimensions(getWindowDimensions());
		// }

		// window.addEventListener('resize', handleResize);
		// return () => window.removeEventListener('resize', handleResize);

		// eslint-disable-next-line
	}, []);

	// const { plotValue } = useContext(DirectionsContext);
	// const [plotCall] = plotValue;
	// const onClick = () => {
	//   plotCall([[0, 0]]);
	// };

	// const directionsContext = useContext(DirectionsContext);
	// const { plotCall } = directionsContext;

	// const onClick = () => {
	// 	plotCall([[0, 0]]);
	// };

	return (
		<ProgressState>
			<Row>
				<Col md={7} className='mapSpace p-0'>
					<Mapbucket />
					<DistanceResetButton />
				</Col>
				<Col md={5}>
					<Mobile>
						<NavMobile />
						<Sheet
							isOpen={true}
							onClose={() => setOpen(false)}
							snapPoints={[height, 250, 108]}
							initialSnap={topSnap}
							// onSnap={snapIndex =>
							//   console.log('> Current snap point index:', snapIndex)
							// }
							className='sheetZfix'
						>
							<Sheet.Container>
								<Sheet.Header></Sheet.Header>
								<Sheet.Content>
									{/* <MobileRoute setTopSnap={setTopSnap} /> */}
									<Switch>
										<Route path='/login'>
											<UserLogin topCall={topCall}/>
										</Route>
										<Route path='/register'>
											<UserCreateAcct topCall={topCall}/>
										</Route>
										<Route exact path={path}>
											<ScrollContent topCall={topCall}/>
										</Route>
										<Route path='/murals/:artId'>
											<MuralContent topCall={topCall}/>
										</Route>
										<Route path='/restaurants/:restId'>
											<RestaurantContent topCall={topCall}/>
										</Route>
									</Switch>
								</Sheet.Content>
							</Sheet.Container>
						</Sheet>
					</Mobile>

					<Desktop>
						<Switch>
							<Route path='/login'>
								<UserLogin topCall={topCall}/>
							</Route>
							<Route path='/register'>
								<UserCreateAcct topCall={topCall}/>
							</Route>
							<Route exact path={path}>
								<ScrollContent topCall={topCall}/>
							</Route>
							<Route path='/murals/:artId'>
								<MuralContent topCall={topCall}/>
							</Route>
							<Route path='/restaurants/:restId'>
								<RestaurantContent topCall={topCall}/>
							</Route>
						</Switch>
					</Desktop>
				</Col>
			</Row>
		</ProgressState>
	);
}

export default Home;
