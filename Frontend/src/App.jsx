import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home, { HomeLoader } from "./Components/Home/Home";
import Root, { RootLoader } from "./Components/Pages/Root";
import { verifyToken } from "./store/AuthStore";
import Survey, { SurveyLoader } from "./Components/Pages/Survey";
import TakeSurvey, { TakeSurveyLoader } from "./Components/Survey/TakeSurvey";
import EditSurvey, { EditSurveyLoader } from "./Components/Survey/EditSurvey";
import Response, { ResponseLoader } from "./Components/Pages/Response";
import AllResponse, { AllResponseLoader } from "./Components/Response/AllResponse";
import CreateSurvey from "./Components/Survey/CreateSurvey";
import SignUpForm from "./Components/Authentication/SignUpForm";
import LoginForm from "./Components/Authentication/LoginForm";

let initial = true;

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		if (initial) {
			dispatch(verifyToken());
			initial = false;
		}
	}, []);

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
					path: "login",
					element: <LoginForm />,
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
					// loader: SurveyLoader,
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
					loader: SurveyLoader,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
