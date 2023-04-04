import * as Icon from "@mui/icons-material";
import classes from "./FormControl.module.css";
import {
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
} from "@mui/material";

const CustomFormControl2 = (props) => {
	const { field } = props;
	const InputIcon = props.icon ? Icon[props.icon] : null;

	return (
		<FormControl
			className={classes.formControl}
			error={field.validities.isInvalid}
			color={field.validities.isValid ? "success" : "primary"}
			sx={{ backgroundColor: "whitesmoke", p: 2 }}
		>
			<FormLabel htmlFor={field.properties.id}>
				{field.validities.label}
			</FormLabel>
			<Input
				sx={{
					marginRight: "0.5rem",
					mt: 2,
					width: "100%",
					backgroundColor: "white",
					border: "solid 1px #979797",
					borderRadius: "3px",
				}}
				{...field.properties}
				endAdornment={
					props.icon && (
						<InputAdornment position="end">
							<IconButton {...props.IconBtnProps}>
								<InputIcon />
							</IconButton>
						</InputAdornment>
					)
				}
				type={props.type ? props.type : field.properties.type}
			/>
			{field.validities.isInvalid && (
				<FormHelperText id="component-error-text">
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomFormControl2;
