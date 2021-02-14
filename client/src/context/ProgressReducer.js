/* eslint-disable import/no-anonymous-default-export */

export default (state, action) => {
	switch (action.type) {
		case "game/levelreset":
			return {
				...state,
				progressControl: 1,
				resetState: 1,
				boostState: 0,
			};
		case "game/murals":
			return {
				...state,
				userMurals: action.payload,
			};
		case "game/hitten":
			return {
				...state,
				hitTen: true,
			};
		case "game/hittwenty":
			return {
				...state,
				hitTwenty: true,
			};
		case "game/hitthirty":
			return {
				...state,
				hitThirty: true,
			};
		case "game/hitfifty":
			return {
				...state,
				hitFifty: true,
			};
		case "game/hiteighty":
			return {
				...state,
				hitEighty: true,
			};
		case "game/hitoneten":
			return {
				...state,
				hitOneTen: true,
			};
		case "game/hitonefifty":
			return {
				...state,
				hitOneFifty: true,
			};
		case "game/hitonesixtytwo":
			return {
				...state,
				hitOneSixtyTwo: true,
			};
		case "modal/progress":
			return {
				...state,
				progressControl: 0,
			};
		case "modal/popup":
			return {
				...state,
				modalShow: true,
			};
		case "modal/drop":
			return {
				...state,
				modalShow: false,
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
