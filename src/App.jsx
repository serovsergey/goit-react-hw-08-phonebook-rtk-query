import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import SharedLayout from "pages/SharedLayoutPage";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { setUserInfo } from "redux/auth/auth.slice";
import authSelectors from "redux/auth/selector.auth";
// import authOperations from "redux/auth/operations.auth";
import { useGetCurrentUserQuery } from "services/contacts.api";

const Home = lazy(() => import('./pages/HomePage'));
const Contacts = lazy(() => import('./pages/ContactsPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const Login = lazy(() => import('./pages/LoginPage'));

// TODO Abort
export const App = () => {
  const username = useSelector(authSelectors.getUserName);
  const token = useSelector(authSelectors.getToken);
  const { data, isLoading } = useGetCurrentUserQuery(null, { skip: !token || username });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data));
    }
  }, [data, dispatch])

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path='/' element={<SharedLayout />} >
            {/* <Route path='/' element={<PublicRoute />}> */}
            <Route path='/' element={<Navigate to='/contacts' />}>
              <Route path='' element={<Home />} />
            </Route>
            <Route path='/contacts' element={<PrivateRoute />} >
              <Route path='' element={<Contacts />} />
            </Route>
            <Route path='/' element={<PublicRoute restricted />}>
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  )
};
