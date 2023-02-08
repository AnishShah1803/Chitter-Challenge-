import axios from "axios";

export const getPeeps = async (setPeeps, setGetError) => {
	try {
		const res = await axios.get("http://localhost:4000/");
		setPeeps(res.data);
	} catch (e) {
		setGetError(`Error returning peeps`);
	}
};

export const postAccount = async (account, setPostError, setResponse) => {
	try {
		const { firstName, secondName, username, email, password } = account;
		if (firstName && secondName && username && email && password) {
			const res = await axios.post("http://localhost:4000/register", account);
			setResponse(res.data.message);
		} else {
			setResponse(`Some fields are missing. Please enter them again.`);
		}
	} catch (error) {
		setPostError(error.message);
	}
};
export const postLogin = async (
	login,
	setPostError,
	setResponse,
	setAccount,
	setLoggedIn
) => {
	try {
		const { email, password } = login;
		if (email && password) {
			const res = await axios.post("http://localhost:4000/login", login);
			setResponse(res.data.message);
			if (res.data.message === `Login Success`) {
				setAccount(res.data.account);
				setLoggedIn(true);
			}
		} else {
			setResponse(`Some fields are missing. Please enter them again.`);
		}
	} catch (error) {
		setPostError(error);
	}
};

export const postPeep = async (
	newPeep,
	getPeepHandler,
	setPostError,
	setResponse
) => {
	const { firstName, secondName, username, content, dateCreated } = newPeep;
	try {
		if (firstName && secondName && username && content && dateCreated) {
			const res = await axios.post("http://localhost:4000/", newPeep);
			setResponse(res.data.message);
			if (res.data.message === `Peep Posted`) {
				getPeepHandler();
			} else {
				setResponse("Your peep is not valid");
			}
		}
	} catch (error) {
		setPostError(error);
	}
};
