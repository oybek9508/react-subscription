import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const membershipType = localStorage.getItem("membershipType");
	const { getMe, subscription, isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		getMe();
		if (!isLoggedIn) {
			navigate("/sign-in");
		} else {
			if (!membershipType) {
				alert("권한이 없읍니다");
				const errorPromise = new Promise((resolve) => {
					setTimeout(() => {
						resolve({ status: 401, error: { message: "권한이 없읍니다" } });
					}, 10);
				});
				errorPromise
					.then((res: any) => {
						console.log("res", res);
						return res.data;
					})
					.finally(() => {
						setTimeout(() => {
							navigate("/subscribe");
						}, 10);
					});
				setTimeout(() => {
					navigate("/subscribe");
				}, 10);
			} else {
				setTimeout(() => {
					return console.log("subscription", subscription);
				}, 3000);
			}
		}
	}, []);

	return <Grid>Home Page</Grid>;
};

export default Home;
