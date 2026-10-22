import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-virtualized/styles.css";
import SimpleReactLightbox from "simple-react-lightbox";
import "./index.css";

ReactDOM.render(
	<SimpleReactLightbox>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</SimpleReactLightbox>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
