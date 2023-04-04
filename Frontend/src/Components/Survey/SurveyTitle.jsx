import useInput from "../../Hooks/use-input";
import { validateText } from "../../Utilities/FormValidationFunctions";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

const SurveyTitle = (props) => {
	const [SNViewMode, setSNViewMode] = useState(true);

	const toggleSNViewMode = () => {
		setSNViewMode((prev) => !prev);
	};

	const surveyName = props.surveyName;

	return (
		<>
			{SNViewMode && (
				<Box display={"flex"} justifyContent={"center"}>
					<Typography variant="h4" mr={3} textAlign={"center"}>
						{surveyName.properties.value}
					</Typography>
					<IconButton onClick={toggleSNViewMode}>
						<EditIcon />
					</IconButton>
				</Box>
			)}
			{!SNViewMode && (
				<Box display={"flex"}>
					<CustomFormControl field={surveyName} />
					<IconButton onClick={toggleSNViewMode} sx={{ ml: 3 }}>
						<CheckBoxIcon fontSize="large" />
					</IconButton>
				</Box>
			)}
		</>
	);
};

export default SurveyTitle;
