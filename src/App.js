import React, { useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import FormPage from './Pages/Form'
import LandingPage from './Pages/Landing'

const App = () => {
  // State to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    setIsLoggedIn(!!storedUserData) // Set isLoggedIn based on whether storedUserData exists
  }, [])

  // Handle user signout
  const handleSignOut = () => {
    // Perform signout logic here, including removing user data from localStorage
    localStorage.removeItem('userData')
    setIsLoggedIn(false) // Update isLoggedIn state to false
  }

  return (
    <div className='flex flex-col h-screen justify-between'>
      {/* Header component with authentication props */}
      <Header isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <main>
        {/* Routing setup using React Router */}
        <Routes>
          {/* Landing Page at Root */}
          <Route
            path='/'
            element={
              isLoggedIn ? <LandingPage /> : <Navigate to='/login' replace />
            }
          />
          {/* Login Page */}
          <Route
            path='/login'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <LoginForm onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          {/* Form Page */}
          <Route
            path='/form'
            element={
              isLoggedIn ? <FormPage /> : <Navigate to='/login' replace />
            }
          />
        </Routes>
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  )
}

export default App
