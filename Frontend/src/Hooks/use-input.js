import { useState } from "react";

const useInput = (
	descriptors = { type: "", name: "", label: "", initialValue: "" },
	validationFunction,
	updationFunction = null
) => {
	const [enteredValue, setEnteredValue] = useState(
		descriptors.initialValue || ""
	);
	const [inpWasTouched, setInpwasTouched] = useState(false);

	// const { validity: valueIsValid, message } =
	// 	descriptors.type === "date" && descriptors.prevDate
	// 		? validationFunction(enteredValue, moment(descriptors.prevDate))
	// 		: validationFunction(enteredValue);

	const { validity: valueIsValid, message } =
		validationFunction(enteredValue);

	const valueIsInvalid = inpWasTouched && !valueIsValid;

	const updateValue = (event) => {
		if (updationFunction) updationFunction(event.target.value);
		setEnteredValue((prevState) => event.target.value);
	};

	const inputBlurHandler = () => {
		setInpwasTouched((prevState) => true);
	};

	const resetInput = () => {
		setEnteredValue((prevState) => "");
		setInpwasTouched((prevState) => false);
	};

	const setInitialValue = (val) => {
		setEnteredValue(val);
	};

	return {
		properties: {
			name: descriptors.name,
			type: descriptors.type,
			id: descriptors.name,
			value: enteredValue,
			label: descriptors.label,
			onChange: updateValue,
			onBlur: inputBlurHandler,
		},
		validities: {
			isInvalid: valueIsInvalid,
			isValid: valueIsValid,
			reset: resetInput,
			label: descriptors.label,
			message: message,
			setInitialValue,
		},
	};
};

export default useInput;
