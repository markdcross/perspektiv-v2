import React, { useReducer } from "react";
import VisitContext from "./VisitContext";
import VisitReducer from "./VisitReducer";
import muralsAPI from "../utils/murals-API";


const VisitState = (props) => {
	const initialState = {
		muralVisits: 0,
		muralVisitsID: null,
		error: null,
	};

	const [state, dispatch] = useReducer(VisitReducer, initialState);

	const loadVisits = async (artID) => {
		try {
			muralsAPI.getMural(artID).then((data) => {
				let mural = data;
				dispatch({
					type: "murals/single",
					payload: mural.data.data.visits.length,
				});
				dispatch({
					type: "murals/ID",
					payload: artID,
				});
			});
		} catch (error) {
			dispatch({ type: "load_error" });
		}
	};



	return (
		<VisitContext.Provider
			value={{
				muralVisits: state.muralVisits,
				muralVisitsID: state.muralVisitsID,
				loadVisits
			}}
		>
			{props.children}
		</VisitContext.Provider>
	);
};

export default VisitState;
