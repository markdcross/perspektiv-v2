/* eslint-disable import/no-anonymous-default-export */

export default (state, action) => {
	switch (action.type) {
		case "directions/plotpoints":
			return {
				...state,
				directions: action.payload,
			};
		default:
			return state;
	}
};
