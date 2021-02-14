import React, { useReducer } from "react";
import ProgressContext from "./ProgressContext";
import ProgressReducer from "./ProgressReducer";
import axios from "axios";

const ProgressState = (props) => {
	const initialState = {
		progressControl: 1,
		modalShow: false,
		resetState: 1,
		boostState: 0,
		userMurals: null,
		hitTen: false,
		hitTwenty: false,
		hitThirty: false,
		hitFifty: false,
		hitEighty: false,
		hitOneTen: false,
		hitOneFifty: false,
		hitOneSixtyTwo: false,
		error: null,
	};

	const [state, dispatch] = useReducer(ProgressReducer, initialState);

	const loadUserMurals = async () => {
		try {
			const res = await axios.get("/api/v1/auth/me");
			dispatch({
				type: "game/murals",
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: "load_error" });
		}
	};

	const levelReset = () => {
		console.log("game/levelreset");
		dispatch({ type: "game/levelreset" });
	};

	const markTen = () => {
		console.log("game/hitten");
		dispatch({ type: "game/hitten" });
	};

	const markTwenty = () => {
		console.log("game/hittwenty");
		dispatch({ type: "game/hittwenty" });
	};

	const markThirty = () => {
		console.log("game/hitthirty");
		dispatch({ type: "game/hitthirty" });
	};

	const markFifty = () => {
		console.log("game/hitfifty");
		dispatch({ type: "game/hitfifty" });
	};

	const markEighty = () => {
		console.log("game/hiteighty");
		dispatch({ type: "game/hiteighty" });
	};

	const markOneTen = () => {
		console.log("game/hitoneten");
		dispatch({ type: "game/hitoneten" });
	};

	const markOneFifty = () => {
		console.log("game/hitonefifty");
		dispatch({ type: "game/hitonefifty" });
	};

	const markOneSixtyTwo = () => {
		console.log("game/hitonesixtytwo");
		dispatch({ type: "game/hitonesixtytwo" });
	};

	const timeout = (delay) => {
		return new Promise((res) => setTimeout(res, delay));
	};

	const modalProg = () => {
		console.log("modal/progress");
		dispatch({ type: "modal/progress" });
		// setProgressControl(0);
	};

	const modalPop = () => {
		console.log("modal/popup");
		dispatch({ type: "modal/popup" });
		// setModalShow(true);
	};

	const modalDrop = () => {
		console.log("modal/drop");
		dispatch({ type: "modal/drop" });
		// setModalShow(true);
	};

	const timerXP = () => {
		levelReset();
		modalProg();
		modalPop();
		// timeout(1000).then(() => modalProg()).then(() => modalDrop());
		console.log("Timer has run");
	};

	return (
		<ProgressContext.Provider
			value={{
				progressControl: state.progressControl,
				modalShow: state.modalShow,
				resetState: state.resetState,
				boostState: state.boostState,
				userMurals: state.userMurals,
				hitTen: state.hitTen,
				hitTwenty: state.hitTwenty,
				hitThirty: state.hitThirty,
				hitFifty: state.hitFifty,
				hitEighty: state.hitEighty,
				hitOneTen: state.hitOneTen,
				hitOneFifty: state.hitOneFifty,
				hitOneSixtyTwo: state.hitOneSixtyTwo,
				error: state.error,
				timerXP,
				levelReset,
				modalProg,
				modalPop,
				modalDrop,
				loadUserMurals,
				markTen,
				markTwenty,
				markThirty,
				markFifty,
				markEighty,
				markOneTen,
				markOneFifty,
				markOneSixtyTwo
			}}
		>
			{props.children}
		</ProgressContext.Provider>
	);
};

export default ProgressState;
