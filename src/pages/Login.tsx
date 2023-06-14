import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useContext(AuthContext);

	const handleLogin = async () => {
		let payload = {
			email: userId,
			password,
		};

		try {
			let res = await login(payload);
			console.log("res", res);
			return res;
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<Container>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				sx={{ width: "100vw", height: "80vh" }}
			>
				<form>
					<Grid container direction="column" sx={{ width: "30vw" }}>
						<Typography>Login</Typography>
						<TextField
							label="user id"
							sx={{ my: 4 }}
							value={userId}
							name={userId}
							placeholder="user id"
							type="text"
							onChange={(e) => setUserId(e.target.value)}
						/>
						<TextField
							value={password}
							name={password}
							label="password"
							placeholder="password"
							type="text"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={handleLogin} sx={{ mt: 4 }} variant="contained">
							Login
						</Button>
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};

export default Login;
