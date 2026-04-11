export function getToken() {
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function parseJwt(token) {
  try {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getUserData() {
  const token = getToken();
  return parseJwt(token);
}

export function getUserId() {
  const data = getUserData();
  return data?.sub ?? null;
}

export function getUserRole() {
  const data = getUserData();
  return data?.role ?? null;
}

export function logoutUser() {
  localStorage.removeItem('token');
}