const SERVER_URL = 'http://localhost:3000';

const apiService = {};

apiService.register = async (user) => {
  try {
    const response = await fetch(`${SERVER_URL}/createUser`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    return error;
  }
};

apiService.login = async (username, password) => {
  try {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response;
  } catch (error) {
    return error;
  }
};

apiService.logout = async () => {
  const cookieValue = document.cookie;
  try {
    const response = await fetch(`${SERVER_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${cookieValue}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default apiService;
