import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import { SharedLayout } from "pages/SharedLayout";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import authOperations from "redux/auth/operations.auth";

const Home = lazy(() => import('./pages/Home'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  })
  return (
    <>
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route path='/' element={<PublicRoute />}>
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
    </>
    // <main>
    //   <Section>
    //     <h1>Phonebook</h1>
    //     <hr />
    //   </Section>
    //   <Section>
    //     <h2>Add new contact</h2>
    //     <ContactForm />
    //   </Section>
    //   <Section title="Contact list">
    //     <Filter />
    //     <ContactList />
    //   </Section>
    // </main>
  );
};
