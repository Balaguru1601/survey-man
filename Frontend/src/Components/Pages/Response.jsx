import { Outlet } from "react-router-dom";
import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Response = () => {
	return <Outlet />;
};

export const ResponseLoader = async ({ params }) => {
	try {
		const response = await axios.get(
			baseURL + "/response/all/" + params.sId
		);
		return { status: 200, responses: response.data.responses };
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message,
				severity: "error",
			})
		);
	}
};

export default Response;
