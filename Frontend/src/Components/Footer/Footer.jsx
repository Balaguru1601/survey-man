import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
	return (
		<>
			<footer className={classes["padding_4x"]}>
				<div className={classes.flex}>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<Link>About us</Link>
						<Link>Our goal</Link>
						<Link>Insights</Link>
						<Link>Work with us</Link>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Newsletter</h3>
						<p>You can trust us. we only send promo offers,</p>
						<br />
						<fieldset className={classes["fixed_flex"]}>
							<input
								type="email"
								name="newsletter"
								placeholder="Your Email Address"
							/>
							<button
								className={
									classes["btn"] + " " + classes["btn_2"]
								}
							>
								Subscribe
							</button>
						</fieldset>
					</section>
				</div>
				<div className={classes.flex}>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<p>Copyright ©2023 All rights reserved || Survey man</p>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-facebook"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-twitter"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-dribbble"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-linkedin"]
								}
							></i>
						</a>
					</section>
				</div>
			</footer>
		</>
	);
};

export default Footer;
