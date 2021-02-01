import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button, Rating } from "semantic-ui-react";
import restaurantsAPI from "../utils/restaurants-API";
import RestaurantUserContent from "./RestaurantUserContent";
import NavDesktopM from "./NavDesktopM";
import PhotoModal from "./PhotoModal";
import history from "./History"
import { useMediaQuery } from "react-responsive";
// import DistanceButton from "./DistanceButton";

export default function RestaurantContent(props) {
	const Desktop = ({ children }) => {
		const isDesktop = useMediaQuery({ minWidth: 768 });
		return isDesktop ? children : null;
	};
	const Mobile = ({ children }) => {
		const isMobile = useMediaQuery({ maxWidth: 767 });
		return isMobile ? children : null;
	};

	const { restId } = useParams();

	const [restaurantState, setRestaurantState] = useState([]);

	useEffect(() => {
		restaurantsAPI.getRestaurant(restId).then((data) => {
			setRestaurantState(data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleClick() {
		history.goBack();
	}

	const [modalShow, setModalShow] = useState(false);

	return (
		<>
			<Desktop>
				<NavDesktopM />
			</Desktop>
			<Row className='pt-2 bigScroll'>
				{!restaurantState.data ? (
					<div>Loading...</div>
				) : (
					<Col>
						<Mobile>
							<Row className='px-3'>
								<Col className='pb-2'>
									<Button content='Back' onClick={handleClick}/>
								</Col>
								<Col className='text-right pb-2'>
									<Button color='yellow' onClick={() => setModalShow(true)}>
										Post Photo
									</Button>
									<PhotoModal
										show={modalShow}
										onHide={() => setModalShow(false)}
									/>
								</Col>
							</Row>
						</Mobile>
						<Desktop>
							<Row>
								<Col className='pb-2'>
									<Button content='Back' onClick={handleClick}/>
								</Col>
								<Col className='text-right pb-2'>
									<Button color='yellow' onClick={() => setModalShow(true)}>
										Post Photo
									</Button>
									<PhotoModal
										show={modalShow}
										onHide={() => setModalShow(false)}
									/>
								</Col>
							</Row>
						</Desktop>
						<Row className='sideImgBox'>
							<Col className='p-0'>
								<Image
									className='img-fluid w-100'
									src={restaurantState.data.data.image}
								/>
							</Col>
						</Row>
						<Mobile>
							<Row className='mb-4 pt-1 px-3'>
								<Col xs={6} className='text-left'>
									<Button
										size='mini'
										color='yellow'
										content='Distance'
										icon='location arrow'
										label={{
											basic: true,
											color: "yellow",
											pointing: "left",
											content: "2,048",
										}}
									/>
								</Col>
								<Col xs={6} className='text-right'>
									<Rating
										icon='star'
										defaultRating={restaurantState.data.data.rating}
										maxRating={5}
									/>
								</Col>
							</Row>
						</Mobile>
						<Desktop>
							<Row className='mb-4 pt-1'>
								<Col xs={6} className='text-left'>
									<Button
										size='mini'
										color='yellow'
										content='Distance'
										icon='location arrow'
										label={{
											basic: true,
											color: "yellow",
											pointing: "left",
											content: "2,048",
										}}
									/>
								</Col>
								<Col xs={6} className='text-right'>
									<Rating
										icon='star'
										defaultRating={restaurantState.data.data.rating}
										maxRating={5}
									/>
								</Col>
							</Row>
						</Desktop>
						<Mobile>
							<Row className='px-3'>
								<Col>
									<p>RESTAURANT: {restaurantState.data.data.name}</p>
									<p>CATEGORY: {restaurantState.data.data.category}</p>
									<p>ADDRESS: {restaurantState.data.data.address} </p>
									<p>
										PRICE:
										{!restaurantState.data.data.price
											? "----"
											: restaurantState.data.data.price}
									</p>
								</Col>
							</Row>
						</Mobile>
						<Desktop>
							<Row>
								<Col>
									<p>RESTAURANT: {restaurantState.data.data.name}</p>
									<p>CATEGORY: {restaurantState.data.data.category}</p>
									<p>ADDRESS: {restaurantState.data.data.address} </p>
									<p>
										PRICE:
										{!restaurantState.data.data.price
											? "----"
											: restaurantState.data.data.price}
									</p>
								</Col>
							</Row>
						</Desktop>
						<Row className='h-100 w-100 mx-0'>
							<Col className='p-0'>
								<RestaurantUserContent />
							</Col>
						</Row>
					</Col>
				)}
			</Row>
		</>
	);
}
