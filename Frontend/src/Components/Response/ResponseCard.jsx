import { Box, Typography } from "@mui/material";

const ResponseCard = (props) => {
	const { response } = props;
	return (
		<Box
			sx={{
				backgroundColor: "white",
				color: "black",
				my: 2,
				p: 2,
				borderRadius: 2,
			}}
		>
			<Typography variant="h6" color={"black"}>
				Name: {response.name}
			</Typography>
			<Typography variany="body1">Email: {response.email}</Typography>
			<Box sx={{ my: 1 }}>
				{response.response.map((item, index) => (
					<Box
						sx={{
							backgroundColor: "whitesmoke",
							my: 1,
							border: "1px solid #a9a9a9",
							borderRadius: 1,
							padding: 2,
						}}
					>
						<Typography variant="body2" key={"question" + index}>
							Question: {item.question.question}
						</Typography>
						<Typography variant="body2" key={"answer" + index}>
							Answer:{" "}
							{item.question.type === "radio"
								? +item.answer === 0
									? "No"
									: "Yes"
								: item.answer}
						</Typography>
						<Typography variant="subtitle2" key={"type" + index}>
							Question type: {item.question.type}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default ResponseCard;
