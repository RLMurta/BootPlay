import ReactDOM from 'react-dom/client'
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { UserDashboard } from './pages/UserDashboard';
import { Wallet } from './pages/Wallet';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={< PrivateRoutes />}>
            <Route path='/dashboard' element={< Dashboard />} />
          </Route>
          <Route path='/user_dashboard' element={< PrivateRoutes />}>
            <Route path='/user_dashboard' element={< UserDashboard />} />
          </Route>
          <Route path='/wallet' element={< PrivateRoutes />}>
            <Route path='/wallet' element={< Wallet />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
)
