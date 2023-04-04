import axios from "axios";
import store from "../../store/redux";
import { redirect } from "react-router-dom";
import { SnackActions } from "../../store/SnackStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const AllResponse = () => {
	return <div>AllResponse</div>;
};

export const AllResponseLoader = async () => {
	try {
		const response = axios.get(baseURL + "/response/all");
		return { status: 200, responses: response.data.responses };
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
