import axios from "axios";
import store from "../../store/redux";
import { redirect, useLoaderData } from "react-router-dom";
import { SnackActions } from "../../store/SnackStore";
import { Box, Container, Typography } from "@mui/material";
import ResponseCard from "./ResponseCard";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const AllResponse = () => {
	const { survey, responses } = useLoaderData();

	const responseComponent = responses.map((response) => (
		<ResponseCard response={response} />
	));

	return (
		<Container>
			<Typography variant="h4" textAlign={"center"} color={"white"}>
				{survey.name}
			</Typography>
			<Typography
				variant="body2"
				textAlign={"center"}
				mt={2}
				color={"CaptionText"}
			>
				Number of responses: {survey.noOfResponse}
			</Typography>
			<Box>{responseComponent}</Box>
		</Container>
	);
};

export const AllResponseLoader = async ({ params }) => {
	try {
		const response = await axios.get(
			baseURL + "/response/all/" + params.sId
		);
		const survey = await axios.get(baseURL + "/survey/get/" + params.sId);
		return {
			status: 200,
			responses: response.data.responses,
			survey: survey.data.survey,
		};
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				severity: "error",
				message: e.response.data.message,
			})
		);
		return redirect("/");
	}
};

export default AllResponse;
