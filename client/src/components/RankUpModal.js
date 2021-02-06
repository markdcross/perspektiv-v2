import React from "react";
import { Modal, Image } from "react-bootstrap";



export default function RankUpModal(props) {

	return (
		<Modal
			{...props}
			size='sm'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header>
				<Modal.Title id='contained-modal-title-vcenter' className='text-center mx-auto'>
					<p>You Leveled Up!!</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center'>
            <Image
						src={`../../assets/images/gif/rocket.gif`}
						alt={"spinning gif"}
						width={200}
					/>
            <p>You have achieved the rank of {props.title}!! You now need {props.xp} murals to get to the next level! Good luck and good hunting!!</p>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
}
