import useInput from "../../Hooks/use-input";
import {
	validateText,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import SurveyTitle from "./SurveyTitle";
import AddQuestion from "./AddQuestion";
import Error from "../UI/Typography/Error";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const CreateSurvey = () => {
	const [addTextField, setAddTextField] = useState(0);
	const [addRadioField, setAddRadioField] = useState(0);
	const [error, setError] = useState(null);

	const surveyName = useInput(
		{
			name: "surveyName",
			label: "Enter the survey name",
			type: "text",
			initialValue: "Sample survey",
		},
		validateText
	);

	const addTextFieldHandler = (value) => {
		if (value === -1 && addTextField > 0)
			setAddTextField((prev) => prev - 1);
		else if (value === 1 && addTextField < 7)
			setAddTextField((prev) => prev + 1);
		console.log(addTextField);
	};

	const addRadioFieldHandler = (value) => {
		if (value === -1 && addRadioField > 0)
			setAddRadioField((prev) => prev - 1);
		else if (value === 1 && addRadioField < 7)
			setAddRadioField((prev) => prev + 1);
	};

	const TextFieldList = [
		useInput(
			{
				name: "question-1",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 1",
			},
			validateText
		),
		useInput(
			{
				name: "question-2",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 2",
			},
			validateText
		),
		useInput(
			{
				name: "question-3",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 3",
			},
			validateText
		),
		useInput(
			{
				name: "question-4",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 4",
			},
			validateText
		),
		useInput(
			{
				name: "question-5",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 5",
			},
			validateText
		),
		useInput(
			{
				name: "question-6",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 6",
			},
			validateText
		),
		useInput(
			{
				name: "question-7",
				label: "Enter Question for text answers",
				type: "text",
				initialValue: "Text Question 7",
			},
			validateText
		),
	];

	const RadioFieldList = [
		useInput(
			{
				name: "question-1",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 1",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-2",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 2",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-3",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 3",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-4",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 4",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-5",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 5",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-6",
				label: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 6",
			},
			validateYesNo
		),
		useInput(
			{
				name: "question-7",
				llabel: "Enter Question for yes or no answers",
				type: "text",
				initialValue: "Radio Question 7",
			},
			validateYesNo
		),
	];
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

	const addSurvey = async () => {
		try {
			if (!isFormValid) {
				setError("Please enter valid credentials");
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

			const response = await axios.post(baseURL + "/survey/create", {
				questions,
				name: surveyName.properties.value,
			});
			if (response.status === 200) {
				// return console.log(response.data);
				return redirect("/survey/" + response.data.survey._id);
			}
		} catch (e) {
			console.log(e.response.data);
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
				onClick={addSurvey}
				sx={{ ml: "50%", transform: "translateX(-50%)", mt: 5 }}
			>
				Add Survey
			</Button>
		</Container>
	);
};

export default CreateSurvey;
