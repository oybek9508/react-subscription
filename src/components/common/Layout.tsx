import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { user, logout } = React.useContext(AuthContext);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/">
						<Button color="inherit">Home</Button>
					</Link>
					{Object.keys(user || {}).length === 0 ? (
						<Link to="/sign-in">
							<Button color="inherit">Login</Button>
						</Link>
					) : (
						<Button color="inherit" onClick={logout}>
							Logout
						</Button>
					)}
					<Link to="/subscribe">
						<Button color="inherit">Subscribe</Button>
					</Link>
				</Toolbar>
			</AppBar>
			<Container>{children}</Container>
		</Box>
	);
};

export default Layout;
