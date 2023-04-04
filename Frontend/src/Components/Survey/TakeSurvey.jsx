import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import Question from "../Question/Question";
import { Button, Typography } from "@mui/material";
import useInput from "../../Hooks/use-input";
import {
	validateEmail,
	validateName,
	validateText,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import CustomFormControl2 from "../UI/FormControl/CustomFormControl2";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Error from "../UI/Typography/Error";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const TakeSurvey = () => {
	const { sId } = useParams();
	const { survey } = useLoaderData();
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const questionFieldList = [];

	const name = useInput(
		{
			name: "name",
			type: "text",
			label: "Enter your name",
		},
		validateName
	);
	const email = useInput(
		{
			name: "email",
			type: "email",
			label: "Enter your email",
		},
		validateEmail
	);

	for (const q of survey.questions) {
		questionFieldList.push(
			useInput(
				{
					type: q.type,
					label: q.question,
					name: q._id,
				},
				q.type === "text" ? validateText : validateYesNo
			)
		);
	}

	const questionFieldListValid = () => {
		let count = 0;
		for (const q of questionFieldList) {
			if (q.validities.isValid) count += 1;
		}
		return count === questionFieldList.length ? true : false;
	};

	const formIsValid =
		name.validities.isValid &&
		email.validities.isValid &&
		questionFieldListValid();

	const submitRespons = async () => {
		if (!formIsValid) {
			setError("All fields are required!");
			return;
		}
		try {
			const response = [];
			for (const q of questionFieldList) {
				response.push({
					answer: q.properties.value,
					question: q.properties.name,
				});
			}
			const res = await axios.post(baseURL + "/response/save", {
				sId,
				name: name.properties.value,
				email: email.properties.value,
				response,
			});
			if (res.status === 200)
				dispatch(
					SnackActions.setSnack({
						message: res.data.message,
						severity: "success",
					})
				);
			return navigate("/");
		} catch (e) {
			dispatch(
				SnackActions.setSnack({
					message: e.response.data.message,
					severity: "error",
				})
			);
			return navigate("/");
		}
	};

	const questions = questionFieldList.map((question, index) => (
		<Question question={question} key={index} />
	));
	return (
		<Container>
			<Typography
				variant="h4"
				textAlign={"center"}
				color={"white"}
				mb={2}
			>
				{survey.name}
			</Typography>
			{error && <Error message={error} />}
			<CustomFormControl2 field={name} />
			<CustomFormControl2 field={email} />
			{questions}
			<Button onClick={submitRespons}>Submit</Button>
		</Container>
	);
};

export const TakeSurveyLoader = async ({ params }) => {
	try {
		const response = await axios.get(baseURL + "/survey/get/" + params.sId);
		return { status: 200, survey: response.data.survey };
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message,
				severity: "error",
			})
		);
	}
};

export default TakeSurvey;
