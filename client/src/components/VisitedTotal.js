import React, { useContext } from "react";
import VisitContext from "../context/VisitContext";
import { Button } from "semantic-ui-react";

export default function VisitedTotal(props) {
	const muralTotal = props.muralTotal;
	const muralID = props.muralID;

	const visitContext = useContext(VisitContext);
	const { muralVisits, muralVisitsID } = visitContext;

	// useEffect(() => {
	// 	loadVisits(muralID);
	// }, []);
	// console.log(muralVisits);
	// console.log(muralTotal);

	// <>
	// <p>{muralID} -Mural ID from main</p>
	// <p>{muralVisitsID} -Mural ID from checkbox</p>

	// <p>{muralVisits} - from MuralVisits</p>
	// <p>{muralTotal} - from MuralTotal</p>
	// </>

	return (
		<>
			{muralVisitsID === muralID ? (
				// 	<p>loading...</p>
				// ) : (
				// totalVisits.data.data.map((mural) => {
				// return (
				// <>
				// 	{muralID === mural.id ? (
				<Button
					size='mini'
					content='Visits'
					icon='street view'
					label={{
						as: "a",
						basic: true,
						pointing: "left",
						content: muralVisits,
					}}
					className='pl-2 pr-3'
				/>
			) : (
				<Button
					size='mini'
					content='Visits'
					icon='street view'
					label={{
						as: "a",
						basic: true,
						pointing: "left",
						content: muralTotal,
					}}
					className='pl-2 pr-3'
				/>
			)}
		</>
	);
	// 		})
	// 	)}
	// </>
	// );
}
