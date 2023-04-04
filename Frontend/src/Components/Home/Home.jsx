import { Box, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import SurveyCards from "../Survey/SurveyCards";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
	const rootLoaderData = useLoaderData();

	const surveys = rootLoaderData.surveys.map((survey, index) => (
		<Grid item xs={8} md={6} lg={4} key={index}>
			<SurveyCards survey={survey} />
		</Grid>
	));

	if (rootLoaderData.surveys.length === 0)
		return (
			<Container>
				<Box sx={{ flexGrow: 1 }}>
					<Typography
						variant="h4"
						color={"white"}
						textAlign={"center"}
					>
						No Surveys found
					</Typography>
				</Box>
			</Container>
		);
	return (
		<Container>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{surveys}
					<Grid item xs={8} md={6} lg={4}>
						<Paper></Paper>
					</Grid>
					<Grid item xs={8} md={6} lg={4}>
						<Paper></Paper>
					</Grid>
					<Grid item xs={8} md={6} lg={4}>
						<Paper></Paper>
					</Grid>
					<Grid item xs={8} md={6} lg={4}>
						<Paper></Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export const HomeLoader = async () => {
	try {
		const response = await axios.get(baseURL + "/survey/all");
		console.log(response);
		return { status: 200, surveys: response.data.surveys };
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message || "Retreiving failed",
				severity: "error",
			})
		);
	}
};

export default Home;
