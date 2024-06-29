import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { HostelProvider } from './contexts/HostelContext';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/home';
import FilterPage from './components/filter/FilterPage';
import HostelInfo from './components/hostelInfo/HostelInfo';
import SavedHostels from './components/saved/SavedHostels';
import Profile from './components/user/Profile';
import Header from './components/header';

function App() {
  const routesArray = [
    { path: '*', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/home', element: <Home /> },
    { path: '/hostel/:id', element: <HostelInfo /> },
    { path: '/filter', element: <FilterPage /> },
    { path: '/saved', element: <SavedHostels /> },
    { path: '/profile', element: <Profile /> },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <HostelProvider>
        <Header />
        <div className="w-full h-screen flex flex-col mt-12">
          {routesElement}
        </div>
      </HostelProvider>
    </AuthProvider>
  );
}

export default App;
