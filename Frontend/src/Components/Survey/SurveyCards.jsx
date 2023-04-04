import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SurveyCards = (props) => {
	return (
		<Paper sx={{ p: 2 }}>
			<Link>
				<Typography variant={"h4"}>Survey title</Typography>
				<Typography variant={"body2"}>Respondants: </Typography>
			</Link>
		</Paper>
	);
};

export default SurveyCards;
