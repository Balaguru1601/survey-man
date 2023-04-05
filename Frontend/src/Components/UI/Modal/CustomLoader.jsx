import { Fragment } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import { Box, CircularProgress } from "@mui/material";

const CustomLoader = (props) => {
	return (
		<Fragment>
			{createPortal(
				<Backdrop />,
				document.getElementById("backdrop-root")
			)}
			{createPortal(
				<Box
					sx={{
						position: "absolute",
						top: "50vh",
						left: "50%",
						transform: "translate(-50%,-50%)",
					}}
				>
					<CircularProgress color={"warning"} />
				</Box>,
				document.getElementById("overlay-root")
			)}
		</Fragment>
	);
};

export default CustomLoader;
