import axios from "axios";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setAuthorizationHeader } from "../utils/jwt";

type Subscription = {
	subscription: any;
};

type User = {
	user: any | null;
	login: (payload: any) => Promise<any>;
	logout: () => Promise<any>;
	getMe: () => Promise<any>;
	me: any;
	lightSubscribe: (userId: string) => Promise<any>;
	premiumSubscribe: (userId: string) => Promise<any>;
	subscription: Subscription;
	isSubscribed: string;
	isLoggedIn: boolean;
};

const BASE_URL = process.env.REACT_APP_BASE_API_URL;
console.log("BASE_URL", BASE_URL);

const AuthContext = createContext<User>({} as User);

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [subscription, setSubscription] = useState<any>();
	const navigate = useNavigate();
	const [response, setResponse] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [me, setMe] = useState<any>();

	const [user, setUser] = useState(() => {
		if (localStorage.getItem("tokens")) {
			let tokens = JSON.parse(localStorage.getItem("tokens") as string);
			return jwt_decode(tokens.access_token);
		}
		return null;
	});

	const login = async (payload: any) => {
		const apiResponse = await axios.post(`${BASE_URL}/auth/login`, payload);
		console.log("apiResponse", apiResponse?.data);
		localStorage.setItem("tokens", JSON.stringify(apiResponse?.data));
		setUser(jwt_decode(apiResponse?.data?.access_token));
		setIsLoggedIn(true);
		navigate("/");
	};

	const getMe = async () => {
		setAuthorizationHeader();
		const res = await axios.get(`${BASE_URL}/auth/profile`);
		console.log("res", res.data);
		setMe(res.data);
	};

	const lightSubscribe = async (userId: string) => {
		setIsLoading(true);
		setSubscription((prevState: any) => {
			console.log("prevState", prevState);
			return {
				...prevState,
				status: 200,
				userId,
				membership: {
					membershipId: "001",
					name: "라이트",
				},
			};
		});

		const apiPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: subscription });
				setIsSubscribed("light");
			}, 2000);
		});
		apiPromise
			.then((res: any) => {
				console.log("res.data", res.data);

				if (localStorage.getItem("membershipType") === "light") {
					alert("이미 라이트 구독 상태입니다");
				} else if (localStorage.getItem("membershipType") === "premium") {
					if (
						window.confirm(
							"현재 프리미엄 구독 상태입니다. 라이트 구독으로 변경하시겠습니까?"
						)
					) {
						localStorage.setItem("membershipType", "light");
					}
					alert("라이트 구독으로 성공적으로 변경되었습니다");
				} else {
					localStorage.setItem("membershipType", "light");
				}
				setResponse(res.data);
				alert("홈 페이지로 이동합니다");
				setTimeout(() => navigate("/"), 1000);
			})
			.catch((error) => {
				console.log("error", error);
				console.log("API request error:", error);
				setResponse({
					status: 401,
					error,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const premiumSubscribe = async (userId: string) => {
		setIsLoading(true);

		setSubscription((prevState: any) => {
			console.log("prevState", prevState);
			return {
				...prevState,
				status: 200,
				userId,
				membership: {
					membershipId: "002",
					name: "프리미움",
				},
			};
		});

		const apiPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: subscription });
				setIsSubscribed("premium");
			}, 2000);
		});
		apiPromise
			.then((res: any) => {
				console.log("res.data", res.data);

				if (localStorage.getItem("membershipType") === "premium") {
					alert("이미 프리미엄 구독 상태입니다");
				} else if (localStorage.getItem("membershipType") === "light") {
					if (
						window.confirm(
							"현재 라이트 구독 상태입니다. 프리미엄 구독으로 변경하시겠습니까?"
						)
					) {
						localStorage.setItem("membershipType", "premium");
						alert("프리미엄 구독으로 성공적으로 변경되었습니다");
					}
				} else {
					localStorage.setItem("membershipType", "premium");
				}

				setResponse(res.data);
				alert("홈 페이지로 이동합니다");
				setTimeout(() => navigate("/"), 1000);
			})
			.catch((error) => {
				console.log("error", error);
				console.log("API request error:", error);
				setResponse({
					status: 401,
					error,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const logout = async () => {
		localStorage.removeItem("tokens");
		setUser(null);
		setIsLoggedIn(false);
		navigate("/sign-in");
	};

	return (
		<AuthContext.Provider
			value={
				{
					user,
					login,
					logout,
					lightSubscribe,
					premiumSubscribe,
					subscription,
					isSubscribed,
					isLoggedIn,
					me,
					getMe,
				} || {}
			}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
