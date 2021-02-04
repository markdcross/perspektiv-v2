import React, { useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Row, Col } from "react-bootstrap";
import { Button, Progress } from "semantic-ui-react";
import RankUpModal from "./RankUpModal";
// import authAPI from "../utils/auth-API";

export default function UserStatus() {
	const [currentUserState, setCurrentUserState] = useState({
		muralsVisited: 49,
		avatar: "//www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg",
		USERAUTHENTICATED: true,
	});

	// useEffect(() => {
	// 	authAPI.getCurrentUser(USERID).then((data) => {
	// 		setCurrentUserState(data);
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

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

	let resetXP = 1;
	const userXP = [10, 10, 10, 20, 30, 30, 40, 12, 0];
	const userXPMin = [0, 10, 20, 30, 50, 80, 110, 150, 0];

	const [modalShow, setModalShow] = useState(false);
	const [resetState, setResetState] = useState(1);
	const [boostState, setBoostState] = useState(0);

	const timeout = (delay) => {
		return new Promise((res) => setTimeout(res, delay));
	};

	const timerXP = async () => {
        resetXP = 0;
		await timeout(2000);
        console.log("resetXP after Timer" + resetXP);
        setModalShow(true);
		setBoostState(1);
		setResetState(resetXP);
	};
	let levelMark = 0;
	const selectLevel = (visited) => {
		switch (true) {
			case visited >= 0 && visited <= 10:
				if (visited === 9) {
					resetXP = 1;
				}
				if (visited === 10 && resetState === 1) {
					timerXP();
				}
				return 0;
			case visited >= 11 && visited <= 20:
				if (visited === 11) {
					resetXP = 1;
				}
				if (visited === 20 && resetState === 1) {
					timerXP();
				}
				return 1;
			case visited >= 21 && visited <= 30:
				if (visited === 21) {
					resetXP = 1;
				}
				if (visited === 30 && resetState === 1) {
					timerXP();
				}
				return 2;
			case visited >= 31 && visited <= 50:
				if (visited === 31) {
					resetXP = 1;
				}
				if (visited === 50 && resetState === 1) {
					timerXP();
				}
				return 3;
			case visited >= 51 && visited <= 80:
				if (visited === 51) {
					resetXP = 1;
				}
				if (visited === 80 && resetState === 1) {
					timerXP();
				}
				return 4;
			case visited >= 81 && visited <= 110:
				if (visited === 81) {
					resetXP = 1;
				}
				if (visited === 110 && resetState === 1) {
					timerXP();
				}
				return 5;
			case visited >= 111 && visited <= 150:
				if (visited === 111) {
					resetXP = 1;
				}
				if (visited === 150 && resetState === 1) {
					timerXP();
				}
				return 6;
			case visited >= 151 && visited <= 162:
				if (visited === 151) {
					resetXP = 1;
				}
				if (visited === 162 && resetState === 1) {
					timerXP();
				}
				return 7;
			default:
				return 8;
		}
	};

	// let userLevel = selectLevel(currentUserState.user.data.muralsVisited.length());
	let userLevel = selectLevel(currentUserState.muralsVisited);

	console.log(boostState + "after timer" + resetState);
	return (
		<React.Fragment>
			{!currentUserState.USERAUTHENTICATED ? (
				<>
					<Row className='respLogin'>
						<Col className='d-flex justify-content-center my-2'>
							<ReactRoundedImage
								image={currentUserState.avatar}
								roundedColor='#ffffff'
								roundedSize='2'
								imageWidth='100'
								imageHeight='100'
							/>
							<Button className='achievementMark my-auto ml-1' color='yellow'>
								<p>{userRank[8]}</p>
								<div className='achievementMarkCount'>
									<p className='achievementMarkText'>0</p>
								</div>
							</Button>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col>
							<Progress
								success={false}
								disabled={true}
								progress='value'
								value={0}
								total={0}
								active
								color='pink'
								size='small'
							/>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Row className='respLogin'>
						<Col className='d-flex justify-content-center my-2'>
							<ReactRoundedImage
								image='/assets/images/avatars/matthew.png'
								roundedColor='#ffffff'
								roundedSize='2'
								imageWidth='100'
								imageHeight='100'
							/>
							<Button className='achievementMark my-auto ml-1' color='yellow'>
								<p>{userRank[userLevel + boostState]}</p>
								<div className='achievementMarkCount'>
									<p className='achievementMarkText'>
										{currentUserState.muralsVisited}
									</p>
								</div>
							</Button>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col>
							<Progress
								success={false}
								disabled={false}
								progress='value'
								value={
									(currentUserState.muralsVisited - userXPMin[userLevel]) *
									resetState
								}
								total={userXP[userLevel]}
								active
								color='pink'
								size='small'
								className='mt-1'
							/>
						</Col>
						<Col xs={1} className='text-left pl-0'>
							<div className='xpMarkCount'>
								<p className='xpMarkText'>{userXP[userLevel + boostState]}</p>
							</div>
						</Col>
					</Row>
					<RankUpModal show={modalShow} onHide={() => setModalShow(false)} title={userRank[userLevel + boostState]} xp={userXP[userLevel + boostState]}/>
				</>
			)}
		</React.Fragment>
	);
}

// useEffect(() => {
//     setResetState(1);
// }, []);

// const timer = () => {
//     setTimeout(function(){
//         resetXP = 0;
//     }, 2000);
// }

// const reset = () => {
//     setResetState(1);
//     console.log(resetState);
// }
// const userXPMax = [10, 20, 30, 50, 80, 110, 150, 162, 0];
// const normalise = (value) => ((value - userXPMin[userXP]) * 100) / (userXPMax[userXP] - userXPMin[userXP]);
