import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import { useLoaderData } from "react-router-dom";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ViewSurvey = () => {
	const survey = useLoaderData();
	console.log(survey);
	return <div>ViewSurvey</div>;
};

export const ViewSurveyLoader = async ({ params }) => {
	try {
		const response = await axios.get(baseURL + "/survey/get/" + params.sId);
		return { status: 200, survey: response.data.survey };
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message,
				severity: "error",
			})
		);
	}
};

export default ViewSurvey;
