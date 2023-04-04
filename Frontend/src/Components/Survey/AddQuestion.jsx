import useInput from "../../Hooks/use-input";
import { validateText } from "../../Utilities/FormValidationFunctions";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import CustomRadioControl from "../UI/FormControl/CustomRadioControl";

const AddQuestion = (props) => {
	const [ViewMode, setViewMode] = useState(true);

	const toggleViewMode = () => {
		setViewMode((prev) => !prev);
	};

	const { question, type } = props;

	return (
		<Box sx={{ my: 3 }}>
			{ViewMode && (
				<Box display={"flex"}>
					<Typography variant="h6" mr={3}>
						{question.properties.value}
					</Typography>
					<IconButton onClick={toggleViewMode}>
						<EditIcon />
					</IconButton>
				</Box>
			)}
			{!ViewMode && (
				<Box display={"flex"}>
					{<CustomFormControl field={question} />}

					<IconButton onClick={toggleViewMode} sx={{ ml: 3 }}>
						<CheckBoxIcon fontSize="large" />
					</IconButton>
				</Box>
			)}
		</Box>
	);
};

export default AddQuestion;
