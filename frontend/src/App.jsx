import React, { useEffect, useState } from 'react';
import FloatingObject from './components/FloatingObject';
import BouncingObject from './components/BouncingObject';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import { useRecoilValue } from 'recoil';
import { isCheckingAtom, useAuthActions, userState } from '../atoms/Auth';
import { AuthenticatedRoute, ProtectedRoutes } from './ProtectedRoutes';
import ForgotPassword from './pages/ResetPassword';
import Skeleton from './components/Skeleton';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const isCheckingAuth = useRecoilValue(isCheckingAtom);
  const user = useRecoilValue(userState);
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    const checkAuthFn = async () => {
      await checkAuth();
    };
    checkAuthFn()

  }, []);

  if (!isCheckingAuth) {
    return <Skeleton />;
  }

  return (
    <BrowserRouter>
      <div className='relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 overflow-hidden'>
        <FloatingObject
          start={0}
          end={0}
          color={'#8B5CF6'}
          size={150}
          initialPosition={{ x: "5%", y: "10%" }}
          randomPosition={200}
        />
        <FloatingObject
          start={-3}
          end={0}
          color={'#EC4899'}
          size={100}
          initialPosition={{ x: "90%", y: "20%" }}
          randomPosition={400}
        />
        <BouncingObject size={60} color="#F472B6" initialPosition={{ x: '15%', y: '40%' }} />
        <FloatingObject
          start={-150}
          end={window.innerWidth + 150}
          color={'#818CF8'}
          size={75}
          initialPosition={{ x: "50%", y: "30%" }}
          randomPosition={200}
        />
        <FloatingObject
          start={20}
          end={30}
          color={'#FBBF24'}
          size={120}
          initialPosition={{ x: "50%", y: "50%" }}
          randomPosition={25}
        />
        <FloatingObject
          start={-250}
          end={window.innerWidth + 250}
          color={'#F43F5E'}
          size={90}
          initialPosition={{ x: "40%", y: "70%" }}
          randomPosition={350}
        />

        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/signup' element={<AuthenticatedRoute><SignupPage /></AuthenticatedRoute>} />
          <Route path='/login' element={<AuthenticatedRoute><LoginPage /></AuthenticatedRoute>} />
          <Route path='/verify-email' element={<AuthenticatedRoute><EmailVerification /></AuthenticatedRoute>} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:id' element={<ResetPassword/>}/>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
