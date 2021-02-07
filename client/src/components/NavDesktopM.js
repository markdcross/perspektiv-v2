import React, { useContext } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Row, Col, Image } from "react-bootstrap";
import { Button, Progress } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import UserStatus from "./UserStatus";

// auth context
import AuthContext from "../context/auth-v2/authContext.js";

export default function NavDesktopM(props) {
	console.log(props.snapState);

	const authContext = useContext(AuthContext);

	const { isAuthenticated } = authContext;

	const nav = 'desktopM';

	return (
		<UserStatus nav={nav}/>
	);
}
