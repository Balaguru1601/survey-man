import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import store from "../../store/redux";
import { SnackActions } from "../../store/SnackStore";
import CustomSnackbar from "../UI/CustomSnackbar";
import { useSelector } from "react-redux";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Root = () => {
	const snackOpen = useSelector((state) => state.snack.open);
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
			{snackOpen && <CustomSnackbar />}
		</>
	);
};

export const RootLoader = async () => {
	try {
		const response = await axios.get(baseURL + "/survey/all");
		return { status: 200, surveys: response.data.surveys };
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
