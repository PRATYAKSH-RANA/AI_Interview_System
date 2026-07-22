import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa"
import Auth from '../pages/Auth'

function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (userData) {
      onClose()
    }
  }, [userData, onClose])
    
  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4'>
      {/* Fixed typo: max-2-md -> max-w-md */}
      <div className='relative w-full max-w-md'>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className='absolute top-6 right-6 z-20 text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition'
        >
          <FaTimes size={16}/>
        </button>

        <Auth isModel={true}/>
      </div>
    </div>
  )
}

export default AuthModel