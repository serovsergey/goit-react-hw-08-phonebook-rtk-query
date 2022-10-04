// const getIsLoggedIn = state => state.auth.isLoggedIn;
const getIsLoggedIn = state => !!state.auth.token;

const getToken = state => state.auth.token;

const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;

const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;
const getIsLoading = state => state.auth.isLoading;

const getError = state => state.auth.error;

const authSelectors = { getIsLoggedIn, getToken, getUserName, getUserEmail, getIsFetchingCurrentUser, getIsLoading, getError };

export default authSelectors;
