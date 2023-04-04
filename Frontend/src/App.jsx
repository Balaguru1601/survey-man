import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home, { HomeLoader } from "./Components/Home/Home";
import Root, { RootLoader } from "./Components/Pages/Root";
import { verifyToken } from "./store/AuthStore";
import Survey from "./Components/Pages/Survey";
import TakeSurvey, { TakeSurveyLoader } from "./Components/Survey/TakeSurvey";
import EditSurvey, { EditSurveyLoader } from "./Components/Survey/EditSurvey";
import Response, { ResponseLoader } from "./Components/Pages/Response";
import AllResponse, {
	AllResponseLoader,
} from "./Components/Response/AllResponse";
import CreateSurvey from "./Components/Survey/CreateSurvey";
import ViewSurvey, { ViewSurveyLoader } from "./Components/Survey/ViewSurvey";
import SignUpForm from "./Components/Authentication/SignUpForm";
import LoginForm, { loginLoader } from "./Components/Authentication/LoginForm";

let initial = true;

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		if (initial) {
			dispatch(verifyToken());
			initial = false;
		}
	}, [dispatch, isLoggedIn]);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			loader: RootLoader,
			id: "root",
			children: [
				{
					index: true,
					element: <Home />,
					loader: HomeLoader,
				},
				// {
				// 	path: "/register",
				// 	element: <SignUpForm />,
				// },
				{
					path: "/login",
					element: <LoginForm />,
					loader: loginLoader,
				},
				{
					path: "survey",
					element: <Survey />,
					children: [
						{
							path: "take/:sId",
							element: <TakeSurvey />,
							loader: TakeSurveyLoader,
						},
						{
							path: "edit/:sId",
							element: <EditSurvey />,
							loader: EditSurveyLoader,
						},
						{
							path: "create",
							element: <CreateSurvey />,
						},
					],
				},
				{
					path: "response/:sId",
					id: "response-base",
					element: <Response />,
					children: [
						{
							index: true,
							element: <AllResponse />,
							loader: AllResponseLoader,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
