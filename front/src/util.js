export const fetchSvg = async (name) => {
  if (!name) return null;
  try {
    const response = await fetch(
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&format=svg&bold=true&rounded=true`
    );
    if (!response.ok) return null;
    return URL.createObjectURL(await response.blob());
  } catch (error) {
    console.error("Error al obtener el SVG:", error);
    return null;
  }
};

export const DEFAULT_API_URL = "https://autenticate-production.up.railway.app/api/";
// export const DEFAULT_API_URL = "http://localhost:3007/api/";

export async function apiRequest({
  endpoint = "",
  method = "GET",
  data,
  token,
  baseUrl = DEFAULT_API_URL,
}) {
  const url = `${baseUrl}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `${token}`;

  const options = {
    method,
    credentials: "include",
    headers,
  };
  if (method !== "GET" && data !== undefined) options.body = JSON.stringify(data);

  const res = await fetch(url, options);
  let json;
  try {
    json = await res.json();
  } catch {
    json = { success: false, message: "Respuesta inválida del servidor" };
  }
  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: json?.message || "Error en la solicitud",
    };
  }
  return json;
}

export function validateEmail(email) {
  if (!email) return "Ingresa tu correo";
  const ok = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);
  return ok ? null : "Correo inválido";
}

export function validatePassword(password) {
  if (!password) return "Ingresa tu contraseña";
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
  return null;
}

export function validateName(name) {
  if (!name) return "Ingresa tu nombre";
  if (name.trim().length < 2) return "El nombre es muy corto";
  return null;
}

export function setAuthToken(token) {
  // Cookies `expires` expects days; use 1/96 (~15 min) or set on session
  // We'll set a session cookie and rely on server exp; also store in localStorage for convenience
  try {
    // eslint-disable-next-line no-undef
    Cookies.set("token", token); // session cookie
  } catch {}
}

export function clearAuth() {
  try {
    // eslint-disable-next-line no-undef
    Cookies.remove("token");
  } catch {}
  localStorage.removeItem("userData");
}
