import React, { useState, useContext, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Button, Progress } from "semantic-ui-react";
import RankUpModal from "./RankUpModal";
import ProgressContext from "../context/ProgressContext";
import UserStatusDView from "./UserStatusDView";
import UserStatusDMView from "./UserStatusDMView";
import UserStatusMobileView from "./UserStatusMobileView";
import AuthContext from "../context/auth-v2/authContext";

// import authAPI from "../utils/auth-API";

export default function UserStatus(props) {
	const authContext = useContext(AuthContext);
	const { user } = authContext;
	// let userLevel = 0;
	// useEffect(() => {
	// userLevel = selectLevel(user.data.muralsVisited.length());
	// }, []);
	// !user ? ("loading" ) : ( 
	// useEffect(() => {
		// console.log(user.data.data);
	// }, []);
	// )

	//Temporary data for testing the userstatus tool
	const [currentUserState, setCurrentUserState] = useState({
		muralsVisited: 79,
		avatar: "//www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg",
		USERAUTHENTICATED: true,
	});

	let userLevel = null;
	let userAvatar = null;
	let userVisited = null;

		// if (user) {
		// 	userLevel = selectLevel(user.data.muralsVisited.length);
		// 	console.log(user);
		// }
	// useEffect(() => {
	// 	authAPI.getCurrentUser(USERID).then((data) => {
	// 		setCurrentUserState(data);
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	//These are brought in to control aspects of the user Progress
	const {
		progressValue,
		modalValue,
		resetValue,
		boostValue,
		timerValue,
		levelValue,
	} = useContext(ProgressContext);
	const [progressControl, setProgressControl] = progressValue;
	const [modalShow, setModalShow] = modalValue;
	const [resetState, setResetState] = resetValue;
	const [boostState, setBoostState] = boostValue;
	const [timerXP] = timerValue;
	const [levelReset] = levelValue;
	console.log(progressControl + "Progress value from context");
	console.log(resetState + "Reset value from context");

	//Set ranks for user
	const userRank = [
		"Pioneer",
		"Scout",
		"Art Sleuth",
		"RVA Local",
		"Trailblazer",
		"Never Home",
		"Mural Elite",
		"Mural Lorax",
		"Tourist",
	];

	// let resetXP = 1;
	const userXP = [10, 10, 10, 20, 30, 30, 40, 12, 0];
	const userXPMin = [0, 10, 20, 30, 50, 80, 110, 150, 0];

	const selectLevel = (visited) => {
		switch (true) {
			case visited >= 0 && visited <= 10:
				if (visited <= 9) {
					levelReset();
				}

				if (visited === 10 && resetState === 1) {
					timerXP();
				}
				return 0;
			case visited >= 11 && visited <= 20:
				if (visited <= 19) {
					levelReset();
				}

				if (visited === 20 && resetState === 1) {
					timerXP();
				}
				return 1;
			case visited >= 21 && visited <= 30:
				if (visited <= 29) {
					levelReset();
				}

				if (visited === 30 && resetState === 1) {
					timerXP();
				}
				return 2;
			case visited >= 31 && visited <= 50:
				if (visited <= 49) {
					levelReset();
				}

				if (visited === 50 && resetState === 1) {
					timerXP();
				}
				return 3;
			case visited >= 51 && visited <= 80:
				if (visited <= 79) {
					levelReset();
				}

				if (visited === 80 && resetState === 1) {
					timerXP();
				}
				return 4;
			case visited >= 81 && visited <= 110:
				if (visited <= 109) {
					levelReset();
				}

				if (visited === 110 && resetState === 1) {
					timerXP();
				}
				return 5;
			case visited >= 111 && visited <= 150:
				if (visited <= 149) {
					levelReset();
				}

				if (visited === 150 && resetState === 1) {
					timerXP();
				}
				return 6;
			case visited >= 151 && visited <= 162:
				if (visited <= 161) {
					levelReset();
				}

				if (visited === 162 && resetState === 1) {
					// timerXP();
				}
				return 7;
			default:
				return 8;
		}
	};

	if (user) {
		userLevel = selectLevel(user.data.muralsVisited.length);
		userAvatar = user.data.avatar;
		userVisited = user.data.muralsVisited.length
		console.log(userLevel, userAvatar, userVisited);
	}
	// let userLevel = selectLevel(currentUserState.user.data.muralsVisited.length());
	
	// let userLevel = selectLevel(currentUserState.muralsVisited);
	

	return (
		<>
			{props.nav === "mobile" ? (
				<UserStatusMobileView
				userVisited={userVisited}
				userAvatar={userAvatar}
				userRank={userRank}
				userLevel={userLevel}
				userXPMin={userXPMin}
				userXP={userXP}
				/>
			) : props.nav === "desktopM" ? (
				<UserStatusDMView
				userVisited={userVisited}
				userAvatar={userAvatar}
				userRank={userRank}
				userLevel={userLevel}
				userXPMin={userXPMin}
				userXP={userXP}
				/>
			) : (
				<UserStatusDView
					userVisited={userVisited}
					userAvatar={userAvatar}
					userRank={userRank}
					userLevel={userLevel}
					userXPMin={userXPMin}
					userXP={userXP}
				/>
			)}
		</>
	);
}
