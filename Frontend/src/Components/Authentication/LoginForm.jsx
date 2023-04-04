import classes from "./Authentication.module.css";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardActions,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	validatePassword,
	validateText,
} from "../../Utilities/FormValidationFunctions";
import useInput from "../../Hooks/use-input";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../UI/Typography/Error";
import { useDispatch, useSelector } from "react-redux";
import { authActions, verifyToken } from "../../store/AuthStore";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import { SnackActions } from "../../store/SnackStore";
import store from "../../store/redux";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const userField = useInput(
		{ type: "text", label: "Username", name: "username" },
		validateText
	);
	const passwordField = useInput(
		{
			type: "password",
			label: "Password",
			name: "password",
		},
		validatePassword
	);

	useEffect(() => {
		if (isLoggedIn) {
			return navigate("/");
		}
	}, []);

	const formIsValid =
		userField.validities.isValid && passwordField.validities.isValid;

	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (event) => event.preventDefault();

	const loginUser = async (event) => {
		if (!formIsValid) {
			setLoginError("Please enter valid credentials");
			return;
		}
		try {
			event.preventDefault();
			const response = await axios.post(backendUrl + "/user/login", {
				username: userField.properties.value,
				password: passwordField.properties.value,
			});
			const user = response.data.user;
			dispatch(authActions.loginHandler({ user: user }));
			dispatch(
				SnackActions.setSnack({
					message: "Login Successful",
					type: "success",
				})
			);
			navigate("../home");
			userField.validities.reset();
			passwordField.validities.reset();
		} catch (error) {
			setLoginError(error.response.data.message);
		}
	};

	return (
		<div className={classes.form}>
			<Card
				className={classes.card}
				sx={{ backgroundColor: "whitesmoke" }}
			>
				<Link
					to="/"
					style={{
						color: "black",
						textDecoration: "none",
						fontFamily: "monospace",
						fontWeight: "700",
					}}
				>
					{"< Home"}
				</Link>
				<CardContent>
					<form
						id="login-form"
						style={{
							backgroundColor: "white",
							borderRadius: "5px",
							padding: "10px 5px",
							paddingBottom: "1px",
						}}
					>
						{loginError && <Error message={loginError} />}
						<CustomFormControl
							field={userField}
							IconBtnProps={{ disabled: true }}
							icon="AccountCircle"
						/>
						<CustomFormControl
							field={passwordField}
							IconBtnProps={{
								onClick: handleClickShowPassword,
								onMouseDown: handleMouseDownPassword,
								disabled:
									passwordField.properties.value.length === 0,
							}}
							icon={showPassword ? "VisibilityOff" : "Visibility"}
							type={showPassword ? "text" : "password"}
						/>
					</form>
				</CardContent>
				<CardActions
					sx={{
						justifyContent: "space-evenly",
						flexWrap: "wrap",
					}}
				>
					<Button variant="contained" fullWidth onClick={loginUser}>
						Login
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default LoginForm;
