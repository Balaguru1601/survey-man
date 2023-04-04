import { Box, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useLoaderData } from "react-router-dom";
import SurveyCards from "../Survey/SurveyCards";

const Home = () => {
	const loaderData = useLoaderData();
	console.log(loaderData);
	return (
		<Container>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={8} md={6} lg={4}>
						<SurveyCards />
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
					<Grid item xs={8} md={6} lg={4}>
						<Paper></Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

const HomeLoader = async () => {
	try {
		const request = await axios.get("/survey/all");
		return { surveys: request.data.surveys, status: 200 };
	} catch (e) {
		return { status: 400 };
	}
};

export default Home;
