import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Root = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export const RootLoader = async () => {
	try {
		const response = await axios.get(
			baseURL + "/survey/get/642ba55d66b7c07a5753f8e1"
		);
		return { status: 200, surveys: response.data.survey };
	} catch (e) {
		store.dispatch(
			SnackActions.setSnack({
				message: e.response.data.message,
				severity: "error",
			})
		);
	}
};

export default Root;
