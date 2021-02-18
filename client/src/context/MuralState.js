import React, { useReducer } from "react";
import MuralContext from "./MuralContext";
import MuralReducer from "./MuralReducer";
import muralsAPI from "../utils/murals-API";


const MuralState = (props) => {
	const initialState = {
		muralState: [],
		muralVisits: null,
		muralVisitsID: null,
		error: null,
	};

	const [state, dispatch] = useReducer(MuralReducer, initialState);

	const loadMurals = async () => {
		try {
			muralsAPI.getMurals().then((data) => {
				dispatch({
					type: "murals/all",
					payload: data,
				});
			});
		} catch (error) {
			dispatch({ type: "load_error" });
		}
	};

	// const loadMural = async (artID) => {
	// 	try {
	// 		muralsAPI.getMural(artID).then((data) => {
	// 			let mural = data;
	// 			dispatch({
	// 				type: "murals/single",
	// 				payload: mural.data.data.visits.length,
	// 			});
	// 			dispatch({
	// 				type: "murals/ID",
	// 				payload: artID,
	// 			});
	// 		});
	// 	} catch (error) {
	// 		dispatch({ type: "load_error" });
	// 	}
	// };



	return (
		<MuralContext.Provider
			value={{
				muralState: state.muralState,
				muralVisits: state.muralVisits,
				muralVisitsID: state.muralVisitsID,
				loadMurals,
				// loadMural
			}}
		>
			{props.children}
		</MuralContext.Provider>
	);
};

export default MuralState;
