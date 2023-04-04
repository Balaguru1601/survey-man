import { useInput } from "@mui/base";
import { Box } from "@mui/system";
import {
	validateText,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import CustomFormControl2 from "../UI/FormControl/CustomFormControl2";
import CustomRadioControl from "../UI/FormControl/CustomRadioControl";

const Question = (props) => {
	const { question } = props;
	const component =
		question.properties.type === "text" ? (
			<CustomFormControl2 field={question} />
		) : (
			<CustomRadioControl field={question} />
		);
	return <Box>{component}</Box>;
};

export default Question;
