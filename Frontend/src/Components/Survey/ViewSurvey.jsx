import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import { redirect, useLoaderData } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_URL;

const ViewSurvey = () => {
	const { survey, responses } = useLoaderData();
	console.log(survey, responses);
	return <div>ViewSurvey</div>;
};

export const ViewSurveyLoader = async ({ params }) => {
	try {
		const survey = await axios.get(baseURL + "/survey/" + params.sId);
		const responses = await axios.get(
			baseURL + "/response/all/" + params.sId
		);
		return {
			status: 200,
			survey: survey.data.survey,
			responses: responses.data.responses,
		};
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message,
				severity: "error",
			})
		);
		return redirect("/");
	}
};

export default ViewSurvey;
