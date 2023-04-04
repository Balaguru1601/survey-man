import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Error from "../UI/Typography/Error";
import SurveyTitle from "./SurveyTitle";
import useInput from "../../Hooks/use-input";
import {
	validateText,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import AddQuestion from "./AddQuestion";
import { useDispatch } from "react-redux";
import { SnackActions } from "../../store/SnackStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const EditSurvey = () => {
	const { survey } = useLoaderData();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noOfTextQuestions = survey.questions.filter(
		(item) => item.type === "text"
	).length;

	const noOfRadioQuestions = survey.questions.length - noOfTextQuestions;

	const [addTextField, setAddTextField] = useState(
		survey.questions.filter((item) => item.type === "text").length
	);
	const [addRadioField, setAddRadioField] = useState(
		survey.questions.length -
			survey.questions.filter((item) => item.type === "text").length
	);
	const [error, setError] = useState(null);

	const surveyName = useInput(
		{
			name: "surveyName",
			label: "Enter the survey name",
			type: "text",
			initialValue: survey.name,
		},
		validateText
	);

	const TextFieldList = [];
	for (const q of survey.questions)
		if (q.type === "text")
			TextFieldList.push(
				useInput(
					{
						name: q._id,
						label: "Enter question for text answers",
						type: q.type,
						initialValue: q.question,
					},
					validateText
				)
			);

	for (let i = noOfTextQuestions; i < 7; i++)
		TextFieldList.push(
			useInput(
				{
					name: `Question ${i + 1}`,
					label: "Enter question for text answers",
					type: "text",
					initialValue: "Text question " + (i + 1),
				},
				validateText
			)
		);

	const RadioFieldList = [];
	for (const q of survey.questions)
		if (q.type === "radio")
			RadioFieldList.push(
				useInput(
					{
						name: q._id,
						label: "Enter question for yes or no answers",
						type: "text",
						initialValue: q.question,
					},
					validateYesNo
				)
			);

	for (let i = noOfRadioQuestions; i < 7; i++)
		RadioFieldList.push(
			useInput(
				{
					name: `Question ${i + 1}`,
					label: "Enter question for yes or no answers",
					type: "text",
					initialValue: "Radio question " + (i + 1),
				},
				validateYesNo
			)
		);

	const addTextFieldHandler = (value) => {
		if (value === -1 && addTextField > 0) {
			setAddTextField((prev) => prev - 1);
			TextFieldList[addTextField + -1].validities.setInitialValue(
				`Text question ${addTextField}`
			);
		} else if (value === 1 && addTextField < 7)
			setAddTextField((prev) => prev + 1);
		console.log(addTextField);
	};

	const addRadioFieldHandler = (value) => {
		if (value === -1 && addRadioField > 0) {
			console.log(addRadioField);
			setAddRadioField((prev) => prev - 1);
			RadioFieldList[addRadioField - 1].validities.setInitialValue(
				`Radio question ${addRadioField}`
			);
		} else if (value === 1 && addRadioField < 7)
			setAddRadioField((prev) => prev + 1);
	};

	const isTextListValid = () => {
		let count = 0;
		for (let i of TextFieldList.slice(0, addTextField))
			if (i.validities.isValid) count += 1;
		return count === addTextField ? true : false;
	};
	const isRadioListValid = () => {
		let count = 0;
		for (let i of RadioFieldList.slice(0, addRadioField))
			if (i.validities.isValid) count += 1;
		return count === addRadioField ? true : false;
	};

	const isFormValid =
		((addRadioField && isTextListValid()) ||
			(addTextField && isRadioListValid())) &&
		surveyName.validities.isValid;

	const editSurvey = async () => {
		try {
			if (addRadioField == 0 && addTextField == 0) {
				setError("Cannot create without fields!");
				return;
			} else if (!isFormValid) {
				setError("All fields are required!");
				return;
			}
			const questions = [];
			if (addTextField)
				for (let i = 0; i < addTextField; i++) {
					questions.push({
						question: TextFieldList[i].properties.value,
						type: "text",
					});
				}
			if (addRadioField)
				for (let i = 0; i < addRadioField; i++) {
					questions.push({
						question: RadioFieldList[i].properties.value,
						type: "radio",
					});
				}

			const response = await axios.post(baseURL + "/survey/edit", {
				questions,
				name: surveyName.properties.value,
				sId: survey._id,
			});
			if (response.status === 200) {
				dispatch(
					SnackActions.setSnack({
						message: response.data.message,
						severity: "success",
					})
				);
				return navigate("/survey/take/" + response.data.survey._id);
			}
		} catch (e) {
			return dispatch(
				SnackActions.setSnack({
					message: e.response.data.messasge || e,
					severity: "error",
				})
			);
		}
	};

	return (
		<Container
			sx={{ p: 4, backgroundColor: "whitesmoke", borderRadius: 2 }}
		>
			{error && <Error message={error} />}
			<SurveyTitle surveyName={surveyName} />
			{addTextField && (
				<Box>
					{TextFieldList.slice(0, addTextField).map((item, index) => (
						<AddQuestion type="text" question={item} key={index} />
					))}
				</Box>
			)}
			{addRadioField && (
				<Box>
					{RadioFieldList.slice(0, addRadioField).map(
						(item, index) => (
							<AddQuestion
								type="radio"
								question={item}
								key={index + 8}
							/>
						)
					)}
				</Box>
			)}
			<Box display={"flex"} justifyContent={"space-around"}>
				<Button
					variant="contained"
					onClick={() => addTextFieldHandler(1)}
				>
					Add Text Field
				</Button>
				<Button
					variant="contained"
					onClick={() => addTextFieldHandler(-1)}
				>
					Remove Text Field
				</Button>
				<Button
					variant="contained"
					onClick={() => addRadioFieldHandler(1)}
				>
					Add Radio Field
				</Button>
				<Button
					variant="contained"
					onClick={() => addRadioFieldHandler(-1)}
				>
					Remove Radio Field
				</Button>
			</Box>
			<Button
				variant="contained"
				color="error"
				onClick={editSurvey}
				sx={{ ml: "50%", transform: "translateX(-50%)", mt: 5 }}
			>
				Save
			</Button>
		</Container>
	);
};

export const EditSurveyLoader = async ({ params }) => {
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

export default EditSurvey;
