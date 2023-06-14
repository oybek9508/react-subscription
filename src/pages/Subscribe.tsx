import * as React from "react";
import { Button, Card, CardActions, Grid } from "@mui/material";
import AuthContext from "../contexts/AuthContext";

const Subscribe = () => {
	const { me, lightSubscribe, premiumSubscribe } =
		React.useContext(AuthContext);
	return (
		<Grid container justifyContent="space-evenly" sx={{ mt: 5 }}>
			<Card sx={{ minWidth: 275 }}>
				<CardActions>
					<Button size="small" onClick={() => lightSubscribe(me.name)}>
						Subscribe to Light Version
					</Button>
				</CardActions>
			</Card>

			<Card sx={{ minWidth: 275 }}>
				<CardActions>
					<Button size="small" onClick={() => premiumSubscribe(me.name)}>
						Subscribe to Premium Version
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default Subscribe;
