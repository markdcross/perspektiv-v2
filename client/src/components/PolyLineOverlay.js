import React, { useEffect, useContext, useState } from "react";
import { CanvasOverlay } from "react-map-gl";
import DirectionsContext from "../context/DirectionsContext";



export default function PolyLineOverlay(props) {

    // const { plotValue } = useContext(DirectionsContext);
    // let [ plotPoints ] = plotValue;
    // console.log(plotPoints);

    // const [plots, setPlots] = useState(plotPoints);

    // useEffect(() => {
    //     console.log(plotPoints)
    // }, [plotValue]);


	// export default class PolylineOverlay extends PureComponent {
	const _redraw = ({ width, height, ctx, isDragging, project, unproject }) => {
		let { points } = props;
		// console.log(points);
		const {
			color = "goldenrod",
			lineWidth = 3,
			renderWhileDragging = true,
		} = props;
		ctx.clearRect(0, 0, width, height);
		ctx.globalCompositeOperation = "lighter";

		if ((renderWhileDragging || !isDragging) && points) {
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.beginPath();
			points.forEach((point) => {
				const pixel = project([point[0], point[1]]);
				ctx.lineTo(pixel[0], pixel[1]);
			});
			ctx.stroke();
		}
	};

	// render() {
	return <CanvasOverlay redraw={_redraw.bind(this)} />;
	// }
}
