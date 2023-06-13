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

export const setFavorite = (favorite) => ({
  type: 'SET_FAVORITE',
  payload: favorite,
});

export const cleanFavorite = () => ({
  type: 'CLEAN_FAVORITE',
});
