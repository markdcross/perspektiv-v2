import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import DirectionsContext from "../context/DirectionsContext";

const DistanceResetButton = () => {
	const directionsContext = useContext(DirectionsContext);
	const { plotCall } = directionsContext;

	const onClick = () => {
		plotCall([[0, 0]]);
	};
	return (
		<Button
			circular
			color='pink'
			icon='remove'
			className='fixed-top ml-2 mt-2 mapClear'
			onClick={onClick}
			size='mini'
		/>
	);
};

export default DistanceResetButton;
