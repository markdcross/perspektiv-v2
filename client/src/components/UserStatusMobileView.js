import React, { useContext, useEffect } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Row, Col, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Button, Progress } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import RankUpModal from "./RankUpModal";
import ProgressContext from "../context/ProgressContext";

// auth context
import AuthContext from "../context/auth-v2/authContext.js";

export default function UserStatusDVMiew(props) {
	const progressContext = useContext(ProgressContext);
	const {
		progressControl,
		boostState,
		modalShow,
		modalDrop,
		modalPop,
		hitTen,
		hitTwenty,
		hitThirty,
		hitFifty,
		hitEighty,
		hitOneTen,
		hitOneFifty,
		hitOneSixtyTwo,
		markTen,
		markTwenty,
		markThirty,
		markFifty,
		markEighty,
		markOneTen,
		markOneFifty,
		markOneSixtyTwo,
	} = progressContext;

	const userAvatar = props.userAvatar;
	const userVisited = props.userVisited;
	const userRank = props.userRank;
	const userLevel = props.userLevel;
	const userXPMin = props.userXPMin;
	const userXP = props.userXP;

	const authContext = useContext(AuthContext);

	const { isAuthenticated } = authContext;

	useEffect(() => {
		if (userVisited === 10 && !hitTen) {
			modalPop();
			markTen();
		} else if (userVisited === 20 && !hitTwenty) {
			modalPop();
			markTwenty();
		} else if (userVisited === 30 && !hitThirty) {
			modalPop();
			markThirty();
		} else if (userVisited === 50 && !hitFifty) {
			modalPop();
			markFifty();
		} else if (userVisited === 80 && !hitEighty) {
			modalPop();
			markEighty();
		} else if (userVisited === 110 && !hitOneTen) {
			modalPop();
			markOneTen();
		} else if (userVisited === 150 && !hitOneFifty) {
			modalPop();
			markOneFifty();
		} else if (userVisited === 162 && !hitOneSixtyTwo) {
			modalPop();
			markOneSixtyTwo();
		}
	}, [userVisited]);

	return (
		<>
			{isAuthenticated ? (
				<>
					<Row className='fixed-bottom fbNav pb-1'>
						<Col>
							<Row>
								<Col className='pt-3 pr-0'>
									<Link to={"/"}>
										<Image
											className='w-100'
											src='/assets/images/logo/plogo.png'
										/>
									</Link>
								</Col>
								<Col xs={5} className='my-2 respLoginBreak fluid pl-2 pr-0'>
									<Button
										className='achievementMark px-6 w-100 clearfix'
										color='yellow'
									>
										<p>{userRank[userLevel + boostState]}</p>
										<div className='achievementMarkCount'>
											<p className='achievementMarkText'>{userVisited}</p>
										</div>
										<div className='achievementMarkAvatar'>
											<ReactRoundedImage
												image={userAvatar}
												roundedColor='#ffffff'
												roundedSize='0'
												imageWidth='40'
												imageHeight='40'
											/>
										</div>
									</Button>
								</Col>
								<LogoutBtn />
							</Row>
							<Row className='pt-2 '>
								<Col>
									<Progress
										success={false}
										disabled={false}
										progress='value'
										value={
											(userVisited - userXPMin[userLevel]) * progressControl
										}
										total={userXP[userLevel]}
										active
										color='pink'
										size='small'
										className='ml-2 mr-2'
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
											<p className='xpMarkText'>
												{userXP[userLevel + boostState]}
											</p>
										</div>
									</OverlayTrigger>
								</Col>
							</Row>
						</Col>
					</Row>
					<RankUpModal
						show={modalShow}
						onHide={() => modalDrop()}
						title={userRank[userLevel + boostState]}
						xp={userXP[userLevel + boostState]}
						// modalProg={modalProg}
					/>
				</>
			) : (
				<>
					<Row className='fixed-bottom fbNav pb-1'>
						<Col>
							<Row>
								<Col className='pt-3 pr-0'>
									<Link to={"/"}>
										<Image
											className='w-100'
											src='/assets/images/logo/plogo.png'
										/>
									</Link>
								</Col>
								<Col xs={5} className='my-2 respLoginBreak fluid pl-2 pr-0'>
									<Button
										className='achievementMark px-6 w-100 clearfix'
										color='yellow'
									>
										<p>{userRank[8]}</p>
										<div className='achievementMarkCount'>
											<p className='achievementMarkText'>0</p>
										</div>
										<div className='achievementMarkAvatar'>
											<ReactRoundedImage
												image='/assets/images/avatars/matthew.png'
												roundedColor='#ffffff'
												roundedSize='0'
												imageWidth='40'
												imageHeight='40'
											/>
										</div>
									</Button>
								</Col>
								<Col className='text-center pt-2'>
									<Link to='/login'>
										<Button content='LOGIN' basic />
									</Link>
								</Col>
							</Row>
							<Row className='pt-2 '>
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
										className='ml-2 mr-2'
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}
