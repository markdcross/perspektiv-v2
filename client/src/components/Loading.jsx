import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";

export default function Loading() {
	return (
		<Container className='h-100 d-flex justify-content-center'>
			<Row className='text-center mt-5'>
				{/* <Col xs={12}>
					<Image
						src={`../../assets/images/logo/plogo.png`}
						alt={"logo png"}
						width={350}
					/>
				</Col> */}
				<Col xs={12} className="mt-0">
					<Image
						src={`../../assets/images/gif/PerspektivScript.gif`}
						alt={"spinning gif"}
						className='clearfix'
						width={350}
					/>
				</Col>
			</Row>
		</Container>
	);
}
