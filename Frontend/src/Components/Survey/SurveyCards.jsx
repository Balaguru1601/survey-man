import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SnackActions } from "../../store/SnackStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const SurveyCards = (props) => {
	const { survey } = props;
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteSurvey = async () => {
		try {
			const response = await axios.get(
				baseURL + "/survey/delete/" + survey._id
			);
			dispatch(
				SnackActions.setSnack({
					message: response.data.message,
					severity: "success",
				})
			);
			return navigate("/");
		} catch (e) {
			return dispatch(
				SnackActions.setSnack({
					message: e.response.data.message || e,
					severity: "error",
				})
			);
		}
	};
	return (
		<Paper sx={{ p: 2 }}>
			<Link to={"/survey/take/" + survey._id}>
				<Typography variant={"h4"} textAlign={"center"}>
					{survey.name}
				</Typography>
				<Typography
					variant={"body2"}
					textAlign={"center"}
					color={"GrayText"}
				>
					Respondants: {survey.noOfResponse}
				</Typography>
			</Link>
			{isLoggedIn && (
				<>
					<Typography variant="body2" textAlign={"center"}>
						<Link
							to={"/response/" + survey._id}
							style={{ color: "#1976d2" }}
						>
							View responses
						</Link>
					</Typography>
					<Box display={"flex"} justifyContent={"space-around"}>
						<Button>
							<Link
								to={"/survey/edit/" + survey._id}
								style={{ color: "#1976d2" }}
							>
								Edit survey
							</Link>
						</Button>
						<Button onClick={deleteSurvey}>Delete Survey</Button>
					</Box>
				</>
			)}
		</Paper>
	);
};

export default SurveyCards;
