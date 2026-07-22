import  { useState } from 'react'
import { RiRobot3Fill } from "react-icons/ri";
import { GiCometSpark } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react"
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const Auth = ({isModel = false}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    if (loading) return; // Prevent multiple rapid clicks
    setLoading(true);
    
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      
      const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true });
      
      // Debug log to check what your backend is actually sending
      console.log("Backend response:", result.data);

      // Safe fallback: Handles whether backend sends { user: {...} } or just {...}
      const userDataPayload = result.data.user || result.data;

      dispatch(setUserData(userDataPayload)); 
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
    w-full 
    ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
    bg-white shadow-2xl border border-gray-200
       `}>
        <div className='flex items-center justify-center gap-3 mb-6'>
            <div className='bg-black text-white p-2 rounded-lg'>
                <RiRobot3Fill size={18} />
            </div>
            <h2 className='font-semibold text-lg'>VERBA_HIRE</h2>
        </div>
        <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
            Continue with {" "}
            <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
               <GiCometSpark size={16} />
               AI SMART INTERVIEW
            </span>
        </h1>
        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
            Sign in to start AI-Powered Mock Interviews
        </p>
        <motion.button
        onClick={handleGoogleAuth}
        disabled={loading}
        whileHover={{ opacity: loading ? 1 : 0.9, scale: loading ? 1 : 1.03 }}
        whileTap={{ scale: loading ? 1 : 1.03 }}
        className={`w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <FcGoogle size={20} />
          {loading ? "Signing in..." : "Continue With Google"}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Auth