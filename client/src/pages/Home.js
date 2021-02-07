import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
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

	//These states are used to prevent the RankUp modal from re-rendering on resize and to control it's events
	const [progressControl, setProgressControl] = useState(1);
	const [modalShow, setModalShow] = useState(false);
	const [resetState, setResetState] = useState(1);
	const [boostState, setBoostState] = useState(0);

	const timeout = (delay) => {
		return new Promise((res) => setTimeout(res, delay));
	};

  const timerXP = () => {
    setBoostState(1);
    setResetState(0);
    timeout(1000).then(modalProg).then(modalPop);
		console.log("Timer has run");
	};

	const levelReset = () => {
		setProgressControl(1);
		setResetState(1);
		setBoostState(0);
	}

  const modalProg = () => {
		setProgressControl(0);
  }

  const modalPop = () => {
    setModalShow(true);
  }

	//Used for Mobile view page control
	const [isOpen, setOpen] = useState(false);
	const [topSnap, setTopSnap] = useState(1);

	// Screensize detection for mobile view
	const getWindowDimensions = () => {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	};

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		// if there is a current user, load their information in state
		authContext.loadUser();

		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);

		// eslint-disable-next-line
	}, []);

	return (
		<ProgressContext.Provider
			value={{
				progressValue: [progressControl, setProgressControl],
				modalValue: [modalShow, setModalShow],
				resetValue: [resetState, setResetState],
        boostValue: [boostState, setBoostState],
        timerValue: [timerXP],
        levelValue: [levelReset],
        // modalProgValue: [modalProg]
			}}
		>
			<Row>
				<Col md={7} className='mapSpace p-0'>
					<Mapbucket />
				</Col>
				<Col md={5}>
					<Mobile>
						<NavMobile />
						<Sheet
							isOpen={true}
							onClose={() => setOpen(false)}
							snapPoints={[windowDimensions.height, 250, 108]}
							initialSnap={topSnap}
							onSnap={(snapIndex) =>
								console.log("> Current snap point index:", snapIndex)
							}
							className='sheetZfix'
						>
							<Sheet.Container>
								<Sheet.Header></Sheet.Header>
								<Sheet.Content>
									{/* <MobileRoute setTopSnap={setTopSnap} /> */}
									<Switch>
										<Route path='/login'>
											<UserLogin setTopSnap={setTopSnap} />
										</Route>
										<Route path='/register'>
											<UserCreateAcct setTopSnap={setTopSnap} />
										</Route>
										<Route exact path={path}>
											<ScrollContent setTopSnap={setTopSnap} />
										</Route>
										<Route path='/murals/:artId'>
											<MuralContent setTopSnap={setTopSnap} />
										</Route>
										<Route path='/restaurants/:restId'>
											<RestaurantContent setTopSnap={setTopSnap} />
										</Route>
									</Switch>
								</Sheet.Content>
							</Sheet.Container>
						</Sheet>
					</Mobile>
					<Desktop>
						<Switch>
							<Route path='/login'>
								<UserLogin setTopSnap={setTopSnap} />
							</Route>
							<Route path='/register'>
								<UserCreateAcct setTopSnap={setTopSnap} />
							</Route>
							<Route exact path={path}>
								<ScrollContent setTopSnap={setTopSnap} />
							</Route>
							<Route path='/murals/:artId'>
								<MuralContent setTopSnap={setTopSnap} />
							</Route>
							<Route path='/restaurants/:restId'>
								<RestaurantContent setTopSnap={setTopSnap} />
							</Route>
						</Switch>
					</Desktop>
				</Col>
			</Row>
		</ProgressContext.Provider>
	);
}

export default Home;
