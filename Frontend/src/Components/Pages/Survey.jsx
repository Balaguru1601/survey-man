import { Outlet, redirect } from "react-router-dom";
import store from "../../store/redux";

const Survey = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export const SurveyLoader = () => {
	if (store.getState().auth.isLoggedIn) return null;
	return redirect("/login");
};

export default Survey;
