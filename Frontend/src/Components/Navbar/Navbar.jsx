import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthStore";
import { useState } from "react";
import classes from "./Navbar.module.css";
import { SnackActions } from "../../store/SnackStore";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutUser = () => {
		dispatch(authActions.logoutHandler());
		dispatch(
			SnackActions.setSnack({
				message: "Logged out successfully!",
				severity: "success",
			})
		);
	};

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static" sx={{ background: "transparent", mb: 8 }}>
			<Container maxWidth="xl" sx={{ px: 0 }}>
				<Toolbar disableGutters>
					<Link to={"/"}>
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontWeight: 700,
								color: "white",
								textDecoration: "none",
							}}
						>
							Survey man
						</Typography>
					</Link>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "flex", md: "none" },
							}}
						>
							{isLoggedIn && (
								<Button
									sx={{
										color: "black",
										display: "block",
									}}
								>
									<Link
										to="/survey/create"
										style={{
											color: "black",
										}}
									>
										Create Survey
									</Link>
								</Button>
							)}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Survey man
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{isLoggedIn && (
							<Button
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									to="/survey/create"
									className={classes.authLinks}
								>
									Create Survey
								</Link>
							</Button>
						)}
					</Box>

					{!isLoggedIn && (
						<Box>
							<Button>
								<Link to="/login" className={classes.authLinks}>
									Admin Login
								</Link>
							</Button>
						</Box>
					)}
					{isLoggedIn && (
						<Box sx={{ flexGrow: 0 }}>
							<Button>
								<Link
									className={classes.authLinks}
									onClick={logoutUser}
								>
									Logout
								</Link>
							</Button>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
