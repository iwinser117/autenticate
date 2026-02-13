import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import BotonNavegacion from "./BotonNavegacion";
import { apiRequest, validateEmail, validatePassword, validateName, setAuthToken } from "../util";

const Register = ({ onLogin }) => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const validate = () => {
		const e = {
			name: validateName(name),
			email: validateEmail(email),
			password: validatePassword(password),
		};
		setErrors(e);
		return !e.name && !e.email && !e.password;
	};

	const submit = async () => {
		if (loading) return;
		if (!validate()) return;
		setLoading(true);
		try {
			const res = await apiRequest({ endpoint: "register", method: "POST", data: { name, email, password } });
			if (res?.success) {
				toast.success("Registro creado exitosamente", { duration: 1000 });
				const userRes = await apiRequest({ endpoint: "user", method: "GET", token: res.token });
				if (userRes?.success === false || !userRes?.user) {
					toast.error(userRes?.message || "No se pudo obtener el usuario");
					return;
				}
				localStorage.setItem("userData", JSON.stringify(userRes.user));
				setAuthToken(res.token);
				onLogin?.(res.token, userRes.user);
				navigate("/user", { state: userRes.user });
			} else {
				toast.error(res?.message || "No se pudo registrar");
			}
		} catch (err) {
			toast.error("Error de conexión. Intenta nuevamente.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mainContainer">
			<BotonNavegacion rutaObjetivo={'/login'} />
			<div className="authCard">
				<div className="titleContainer">Crear cuenta</div>
				<div className="subtitle">Completa tus datos para registrarte</div>

				<div className="inputContainer">
					<label className="inputLabel">Name</label>
					<input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
					<label className="errorLabel">{errors.name || ''}</label>
				</div>
				<div className="inputContainer">
					<label className="inputLabel">Email</label>
					<input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
					<label className="errorLabel">{errors.email || ''}</label>
				</div>
				<div className="inputContainer">
					<label className="inputLabel">Password</label>
					<input type="password" className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
					<label className="errorLabel">{errors.password || ''}</label>
				</div>
				<div className="buttonContainer">
					<button className="inputButton" type="button" onClick={submit} disabled={loading}>
						{loading ? "Creando..." : "Sign Up"}
					</button>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default Register;