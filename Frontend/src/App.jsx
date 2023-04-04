import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Root, { RootLoader } from "./Components/Pages/Root";
import { verifyToken } from "./store/AuthStore";
import Survey from "./Components/Pages/Survey";
import ViewSurvey, { ViewSurveyLoader } from "./Components/Survey/ViewSurvey";
import EditSurvey from "./Components/Survey/EditSurvey";
import Response, { ResponseLoader } from "./Components/Pages/Response";
import AllResponse from "./Components/Response/AllResponse";
import CreateSurvey from "./Components/Survey/CreateSurvey";

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
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "survey",
					element: <Survey />,
					children: [
						{
							path: ":sId",
							element: <ViewSurvey />,
							loader: ViewSurveyLoader,
						},
						{
							path: "edit/:sId",
							element: <EditSurvey />,
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
					loader: ResponseLoader,
					children: [
						{
							index: true,
							element: <AllResponse />,
						},
					],
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
