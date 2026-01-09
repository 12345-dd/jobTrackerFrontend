import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { getToken } from './utils/auth'
import Dashboard from './components/Dashboard'
import Applications from './components/Applications'
import ResumeInsights from './components/ResumeInsights'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function ProtectedRoute({children}){
  return getToken() ? children : <Navigate to="/login" />
}


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path='/resume' element={<ProtectedRoute><ResumeInsights /></ProtectedRoute>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
