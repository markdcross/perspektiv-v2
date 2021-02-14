import React, { useReducer } from "react";
import DirectionsContext from "./DirectionsContext";
import DirectionsReducer from "./DirectionsReducer";

const DirectionsState = (props) => {
	const initialState = {
		directions: [],
		error: null,
	};

	const [state, dispatch] = useReducer(DirectionsReducer, initialState);

	const plotCall = (points) => {
		console.log("directions/plotpoints");
		dispatch({
			type: "directions/plotpoints",
			payload: points,
		});
	};

	return (
		<DirectionsContext.Provider
			value={{
				directions: state.directions,
				plotCall,
			}}
		>
			{props.children}
		</DirectionsContext.Provider>
	);
};

export default DirectionsState;
