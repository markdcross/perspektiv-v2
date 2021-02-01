import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import NavDesktopM from "./NavDesktopM";
import { useMediaQuery } from "react-responsive";

export default function UserCreateAcct(props) {
	const Desktop = ({ children }) => {
		const isDesktop = useMediaQuery({ minWidth: 768 });
		return isDesktop ? children : null;
	};
	const Mobile = ({ children }) => {
		const isMobile = useMediaQuery({ maxWidth: 767 });
		return isMobile ? children : null;
	};

	return (
		<>
			<Desktop>
				<NavDesktopM />
			</Desktop>
			<Row className='pt-5 bigScroll'>
				<Col className='text-center px-5'>
					<h2>CREATE ACCOUNT</h2>
					<Form className='text-left'>
						<Form.Group controlId='formUserEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control type='email' placeholder='Enter Email' />
							<Form.Text className='text-muted' />
						</Form.Group>
						<Form.Group controlId='formUserPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Password' />
						</Form.Group>
						<Form.Group controlId='formUserConfirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type='password' placeholder='Password' />
						</Form.Group>
						<Button variant='warning' type='submit' className='w-100'>
							CREATE!
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
}
