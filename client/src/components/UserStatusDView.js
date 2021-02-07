import React, { useContext } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Button, Progress } from "semantic-ui-react";
import RankUpModal from "./RankUpModal";
import ProgressContext from "../context/ProgressContext";

// auth context
import AuthContext from "../context/auth-v2/authContext.js";

export default function UserStatusDView(props) {
	const { progressValue, modalValue, boostValue } = useContext(ProgressContext);
	const [progressControl] = progressValue;
	const [modalShow, setModalShow] = modalValue;
	const [boostState] = boostValue;
	// const currentUserState = props.currentUserState;
	const userAvatar = props.userAvatar;
	const userVisited = props.userVisited;
	const userRank = props.userRank;
	const userLevel = props.userLevel;
	const userXPMin = props.userXPMin;
	const userXP = props.userXP;

	const authContext = useContext(AuthContext);

	const { isAuthenticated, user } = authContext;

	return (
		<React.Fragment>
			{!isAuthenticated ? (
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
							{/* {user &&  */}
							<ReactRoundedImage
								image={userAvatar}
								// image='/assets/images/avatars/matthew.png'
								roundedColor='#ffffff'
								roundedSize='2'
								imageWidth='100'
								imageHeight='100'
							/>
							{/* } */}
							<Button className='achievementMark my-auto ml-1' color='yellow'>
								<p>{userRank[userLevel + boostState]}</p>
								<div className='achievementMarkCount'>
									<p className='achievementMarkText'>{userVisited}</p>
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
								value={(userVisited - userXPMin[userLevel]) * progressControl}
								total={userXP[userLevel]}
								active
								color='pink'
								size='small'
								className='mt-1'
							/>
						</Col>
						<Col xs={1} className='text-left pl-0'>
							<OverlayTrigger
								placement='top'
								overlay={
									<Tooltip id={`tooltip-top`}>
										Visits needed for next rank!
									</Tooltip>
								}
							>
								<div className='xpMarkCount'>
									<p className='xpMarkText'>{userXP[userLevel + boostState]}</p>
								</div>
							</OverlayTrigger>
						</Col>
					</Row>
					<RankUpModal
						show={modalShow}
						onHide={() => setModalShow(false)}
						title={userRank[userLevel + boostState]}
						xp={userXP[userLevel + boostState]}
						// modalProg={modalProg}
					/>
				</>
			)}
		</React.Fragment>
	);
}
