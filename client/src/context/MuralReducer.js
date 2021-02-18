/* eslint-disable import/no-anonymous-default-export */

export default (state, action) => {
	switch (action.type) {
		case "murals/all":
			return {
				...state,
				muralState: action.payload,
			};
		case "murals/single":
			return {
				...state,
				muralVisits: action.payload,
			};
		case "murals/ID":
			return {
				...state,
				muralVisitsID: action.payload,
			};
		case "load_error":
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
