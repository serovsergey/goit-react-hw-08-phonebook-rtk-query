const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user.name;

const getIsLoading = state => state.auth.isLoading;

const getError = state => state.auth.error;


const authSelectors = { getIsLoggedIn, getUserName, getIsLoading, getError };

export default authSelectors;
