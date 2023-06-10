export const login = () => ({
  type: 'LOGIN',
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});
