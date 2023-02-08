import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Peeps from "./Components/Peeps";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Navigate } from "react-router-dom";
import {
	getPeeps,
	postAccount,
	postLogin,
	postPeep,
} from "./AsyncFunctions/chitterAPICalls.js";
import { useEffect, useState } from "react";

function App() {
	const [peeps, setPeeps] = useState([]);
	const [getError, setGetError] = useState({ message: `` });
	const [response, setResponse] = useState([]);
	const [postError, setPostError] = useState({ message: `` });
	const [loggedIn, setLoggedIn] = useState(false);
	const [account, setAccount] = useState([]);

	const getPeepsHandler = () => {
		getPeeps(setPeeps, setGetError);
	};
	const postAccountHandler = (account) => {
		postAccount(account, setPostError, setResponse);
	};
	const loginHandler = (login) => {
		postLogin(login, setPostError, setResponse, setAccount, setLoggedIn);
	};
	const postPeepHandler = (peep) => {
		postPeep(peep, getPeepsHandler, setPostError, setResponse);
	};
	useEffect(() => {
		getPeepsHandler();
	}, []);

	return (
		<>
			<div className="App">
				<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				{!getError}
				<Routes>
					<Route
						path="/"
						element={
							<Peeps
								peepData={{ peeps, error: getError.message }}
								loggedIn={loggedIn}
								account={account}
								submitAction={postPeepHandler}
							/>
						}
					/>
					{!postError}
					<Route
						path="/register"
						element={
							<Register submitAction={postAccountHandler} response={response} />
						}
					/>
					{!postError}
					<Route
						path="/login"
						element={<Login submitAction={loginHandler} response={response} />}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
