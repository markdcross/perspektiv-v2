import React from 'react';
// import React, {useContext} from "react"
// import ReactRoundedImage from "react-rounded-image";
// import { Row, Col, Image } from "react-bootstrap";
// import { Button, Progress } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import LogoutBtn from "./LogoutBtn";
import UserStatus from './UserStatus';

// auth context
// import AuthContext from "../context/auth-v2/authContext.js";

export default function NavMobile() {
  // const authContext = useContext(AuthContext);

  // const { isAuthenticated } = authContext;

  const nav = 'mobile';

  return (
    <UserStatus nav={nav} />
    // <Row className='fixed-bottom fbNav'>
    // 	<Col>
    // 		<Row>
    // 			<Col className='pt-3 pr-0'>
    // 				<Link to={"/"}>
    // 					<Image className='w-100' src='/assets/images/logo/plogo.png' />
    // 				</Link>
    // 			</Col>
    // 			<Col xs={5} className='my-2 respLoginBreak fluid pl-2 pr-0'>
    // 				<Button
    // 					content='Tesdfgsdfg'
    // 					className='achievementMark px-6 w-100 clearfix'
    // 					color='yellow'
    // 				>
    // 					Mural Elite
    // 					<div className='achievementMarkCount'>
    // 						<p className='achievementMarkText'>42</p>
    // 					</div>
    // 					<div className='achievementMarkAvatar'>
    // 						<ReactRoundedImage
    // 							image='/assets/images/avatars/matthew.png'
    // 							roundedColor='#ffffff'
    // 							roundedSize='0'
    // 							imageWidth='40'
    // 							imageHeight='40'
    // 						/>
    // 					</div>
    // 				</Button>
    // 			</Col>
    // 			{isAuthenticated ? (
    // 				<LogoutBtn />
    // 			) : (
    // 				<Col className='text-right pt-2'>
    // 					<Link to='/login'>
    // 						<Button content='LOGIN' basic />
    // 					</Link>
    // 				</Col>
    // 			)}
    // 		</Row>
    // 		<Row className='pb-2'>
    // 			<Col className='ml-2 mr-2'>
    // 				<Progress
    // 					progress='value'
    // 					value={3}
    // 					total={10}
    // 					active
    // 					color='pink'
    // 					size='small'
    // 				/>
    // 			</Col>
    // 		</Row>
    // 	</Col>
    // </Row>
  );
}
