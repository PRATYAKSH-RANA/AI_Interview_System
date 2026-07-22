import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import axios from 'axios'
import { setUserData } from './redux/userSlice'
import { useDispatch } from 'react-redux'

export const ServerUrl = "http://localhost:8000";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      try {
        // Fixed the quotes and placement of the config object
        const result = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true });
        // console.log(result.data) we use redux here now
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null))
      }
    }
    getUser()
  }, [dispatch])

  return (
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/auth" element={<Auth />} />
   </Routes>
  )
}

export default App