import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaChartLine,
  FaMicrophoneAlt,
} from 'react-icons/fa'

function Step1SetUp({ onStart }) {
  const [role, setRole] = useState('')
  const [experience, setExperience] = useState('')
  const [mode, setMode] = useState('Technical')
  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState('')
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResumeFile(file)
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setAnalysisDone(true)
      }, 1500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8'
    >
      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>
        
        {/* Left Side: Info & Features */}
        <motion.div 
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='relative bg-gradient-to-br from-green-100 to-green-200 p-12 flex flex-col justify-center'
        >
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>Start Your Interview</h2>
          <p className='text-gray-600 mb-10'>
            Practice real-time mock interviews with AI. Get instant feedback and improve your skills. Click the button below to start your interview session.
          </p>
          <div className='space-y-5'>
            {[
              {
                icon: <FaUserTie className='text-green-600 text-xl' />,
                text: "Set up your profile/experience",
              },
              {
                icon: <FaMicrophoneAlt className='text-green-600 text-xl' />,
                text: "Smart voice recognition for real-time feedback",
              },
              {
                icon: <FaChartLine className='text-green-600 text-xl' />,
                text: "See your progress and performance",
              },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer'
              >
                {item.icon}
                <span className='text-gray-700 font-medium'>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form Inputs */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='p-12 flex flex-col justify-center bg-white overflow-y-auto max-h-screen'
        >
          <h2 className='text-3xl font-bold text-gray-800 mb-8'>Interview Setup</h2>
          <div className='space-y-6'>
            
            {/* Role Input */}
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-2'>Target Role</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-green-500 pointer-events-none'>
                  <FaUserTie className='text-lg' />
                </span>
                <input 
                  type='text' 
                  placeholder='e.g., Frontend Developer' 
                  className='w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition text-gray-700 placeholder-gray-400 text-sm font-medium' 
                  onChange={(e) => setRole(e.target.value)} 
                  value={role}
                />
              </div>
            </div>

            {/* Experience Input */}
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-2'>Experience Level</label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-4 text-green-500 pointer-events-none'>
                  <FaBriefcase className='text-lg' />
                </span>
                <input 
                  type='text' 
                  placeholder='e.g., 2+ Years' 
                  className='w-full py-3.5 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition text-gray-700 placeholder-gray-400 text-sm font-medium' 
                  onChange={(e) => setExperience(e.target.value)} 
                  value={experience}
                />
              </div>
            </div>

            {/* Mode Selector Buttons */}
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-2'>Interview Mode</label>
              <div className='grid grid-cols-2 gap-3'>
                {['Technical', 'HR Interview'].map((m) => (
                  <button
                    key={m}
                    type='button'
                    onClick={() => setMode(m)}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 border ${
                      mode === m 
                        ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-100' 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Upload Box */}
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-2'>Upload Resume (Optional)</label>
              <label className='border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition'>
                <FaFileUpload className='text-green-500 text-3xl mb-2' />
                <span className='text-sm text-gray-600 font-medium'>
                  {resumeFile ? resumeFile.name : "Click to upload or drag & drop"}
                </span>
                <span className='text-xs text-gray-400 mt-1'>PDF, DOCX only</span>
                <input type='file' className='hidden' accept='.pdf,.docx' onChange={handleFileChange} />
              </label>
            </div>

            {/* Analysis Status View */}
            {(analysisDone || analyzing) && (
              <>
                <div className='p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium'>
                  {analyzing ? "Analyzing resume..." : "Resume successfully analyzed! Ready to begin."}
                </div>
                {resumeFile && (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'
                  >
                    <span className='text-gray-700 text-sm font-medium'>
                      File: {resumeFile.name}
                    </span>
                  </motion.div>
                )}
              </>
            )}

            {/* Upgraded Cool Button */}
            <motion.button
              disabled={!role || !experience}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStart && onStart({ role, experience, mode, resumeFile })}
              className='w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 flex items-center justify-center space-x-2 group mt-2'
            >
              <span>Start Interview</span>
              <span className='group-hover:translate-x-1.5 transition-transform duration-200'>→</span>
            </motion.button>

          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Step1SetUp