import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import SharedLayout from "pages/SharedLayoutPage";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import authOperations from "redux/auth/operations.auth";
import authSelectors from "redux/auth/selector.auth";

const Home = lazy(() => import('./pages/HomePage'));
const Contacts = lazy(() => import('./pages/ContactsPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const Login = lazy(() => import('./pages/LoginPage'));

// TODO Abort
export const App = () => {
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch])
  return (
    <>
      {!isFetchingCurrentUser && (
        <Routes>
          <Route path='/' element={<SharedLayout />} >
            {/* <Route path='/' element={<PublicRoute />}> */}
            <Route path='/' element={<Navigate to='/contacts' />}>
              <Route path='' element={<Home />} />
            </Route>
            <Route path='/contacts' element={<PrivateRoute />} >
              <Route path='' element={<Contacts />} />
            </Route>
            <Route path='/register' element={<PublicRoute restricted />}>
              <Route path='' element={<Register />} />
            </Route>
            <Route path='/login' element={<PublicRoute restricted />}>
              <Route path='' element={<Login />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  )
};
