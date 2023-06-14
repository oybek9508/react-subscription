import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const jwtInterceoptor = axios.create({});

export const setAuthorizationHeader = () => {
	let tokensData = JSON.parse(localStorage.getItem("tokens") as string);
	return (axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${tokensData.access_token}`);
};

jwtInterceoptor.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		if (err.response.status === 401) {
			const authData = JSON.parse(localStorage.getItem("tokens") as string);
			const payload = {
				access_token: authData.access_token,
				refresh_token: authData.refreshToken,
			};

			let apiRes = await axios.post(`${BASE_URL}/auth/refresh-token`, payload);
			localStorage.setItem("tokens", JSON.stringify(apiRes.data));
			err.config.headers[
				"Authorization"
			] = `bearer ${apiRes.data.access_token}`;
			return axios(err.config);
		} else {
			return Promise.reject({
				status: 400,
				error: { message: "유효하지 않은 토큰입니다" },
			});
		}
	}
);

export default jwtInterceoptor;
