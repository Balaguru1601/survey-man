import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/system";
import Question from "../Question/Question";
import { Typography } from "@mui/material";
import useInput from "../../Hooks/use-input";
import {
	validateText,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ViewSurvey = () => {
	const { survey } = useLoaderData();

	const questionFieldList = [];

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

	const questions = questionFieldList.map((question, index) => (
		<Question question={question} key={index} />
	));
	return (
		<Container>
			<Typography variant="h4" textAlign={"center"}>
				{survey.name}
			</Typography>
			{questions}
		</Container>
	);
};

export const ViewSurveyLoader = async ({ params }) => {
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

export default ViewSurvey;
