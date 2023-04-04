import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { SnackReducers } from "./SnackStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		snack: SnackReducers,
	},
});

export default store;
