
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"
import { useState } from 'react'
import AuthModel from '../components/AuthModel'
import AI_Ans_Eva from '../assets/AI_Ans_Eva.png'
import Download_PDF_Repo from '../assets/Download_PDF_Repo.png'
import History_Analysis from '../assets/History_Analysis.png'
import Resume_Based from '../assets/Resume_Based.png'
import {
  BsRobot,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsMic,
  BsCodeSlash,
  BsChatDots,
  BsPeople,
  BsLightningCharge
} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'


/*
  FONT SETUP (add once, e.g. in index.html <head> or your global CSS):

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

  Then in tailwind.config.js:
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      }
    }
  }
*/


const Waveform = () => {
  const bars = [10, 18, 26, 16, 22, 12, 20, 14, 24, 10]
  return (
    <div className='flex items-end justify-center gap-[3px] h-8'>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className='w-[3px] rounded-full bg-[#D98C2B]'
          initial={{ height: 6 }}
          animate={{ height: [6, h, 6] }}
          transition={{
            duration: 1.1 + (i % 3) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  )
}

const Home = () => {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#EAEDEC] text-[#171512] font-body flex flex-col'>
      <Navbar />
      <div className='flex-1 px-6 py-20 relative overflow-hidden'>

        {/* soft spotlight glow behind hero — the one accent moment */}
        <div className='pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#D98C2B] opacity-[0.10] blur-[110px]' />

        <div className='relative flex justify-center mb-6'>
          <div className='bg-[#171512] text-[#F6F5F2] text-xs px-4 py-2 rounded-full flex items-center gap-2 font-mono tracking-wide'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D98C2B] opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-[#D98C2B]'></span>
            </span>
            REC — AI INTERVIEW STUDIO
          </div>
        </div>

        <div className='relative text-center mb-20'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='font-display text-4xl md:text-6xl font-medium leading-[1.1] max-w-4xl mx-auto tracking-tight'>
            Practice interviews like{' '}
            <span className='relative inline-block'>
              <span className='relative z-10'>the real thing</span>
              <span className='absolute left-0 right-0 bottom-1 h-3 bg-[#D98C2B]/30 -z-0' />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='text-[#6B6560] mt-6 max-w-xl mx-auto text-lg'>
            Role-based mock interviews with smart follow-ups, adaptive difficulty,
            and feedback that actually tells you what to fix.
          </motion.p>

          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return;
                }
                navigate("/interview")
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className='bg-[#171512] text-[#F6F5F2] px-10 py-3 rounded-full hover:opacity-90 transition shadow-lg shadow-black/10 font-medium'>
              Start Interview
            </motion.button>

            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true)
                  return;
                }
                navigate("/history")
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#171512]/20 px-10 py-3 rounded-full hover:bg-[#171512]/5 transition font-medium'>
              View History
            </motion.button>
          </div>

          <div className='mt-10 flex flex-col items-center gap-2'>
            <Waveform />
            <span className='text-[11px] font-mono tracking-widest text-[#6B6560] uppercase'>
              listening in real time
            </span>
          </div>
        </div>

        {/* Steps Section */}
        <div className='relative flex flex-col md:flex-row justify-center items-stretch gap-6 mb-28 max-w-5xl mx-auto'>
          {/* connecting line behind the cards on desktop */}
          <div className='hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[#171512]/10 -z-0' />

          {
            [
              {
                icon: <BsRobot size={20} />,
                step: "01",
                title: "Role & experience selection",
                description: "Tell it the role and level you're interviewing for."
              },
              {
                icon: <BsMic size={20} />,
                step: "02",
                title: "Smart voice assistant",
                description: "Follow-up questions adapt to what you just said."
              },
              {
                icon: <BsClock size={20} />,
                step: "03",
                title: "Timed like the real thing",
                description: "Practice under the same pressure as interview day."
              },
            ].map((item, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className='relative z-10 bg-white rounded-2xl border border-[#171512]/10 p-8 flex-1 shadow-sm hover:shadow-lg hover:border-[#D98C2B]/40 transition-all duration-300'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='bg-[#171512] text-[#D98C2B] w-11 h-11 rounded-xl flex items-center justify-center'>
                    {item.icon}
                  </div>
                  <span className='font-mono text-xs tracking-widest text-[#6B6560]'>
                    STEP {item.step}
                  </span>
                </div>
                <h3 className='font-display font-medium mb-2 text-lg'>{item.title}</h3>
                <p className='text-sm text-[#6B6560] leading-relaxed'>{item.description}</p>
              </motion.div>
            ))
          }
        </div>

        {/* Advanced AI Capabilities Section with Images */}
        <div className='mb-32 max-w-6xl mx-auto'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='font-display text-4xl font-medium text-center mb-16'>
            Advanced AI{" "}
            <span className='text-[#D98C2B]'>capabilities</span>
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {
              [
                {
                  icon: <BsBarChart size={20} />,
                  tag: "METRIC",
                  title: "AI answer evaluation",
                  description: "Scores communication, technical accuracy, and confidence with granular insights.",
                  image: AI_Ans_Eva
                },
                {
                  icon: <BsFileEarmarkText size={20} />,
                  tag: "RESUME",
                  title: "Resume-based interview",
                  description: "Project-specific questions generated dynamically from your uploaded resume.",
                  image: Resume_Based
                },
                {
                  icon: <BsFileEarmarkText size={20} />,
                  tag: "REPORT",
                  title: "Downloadable PDF report",
                  description: "Get detailed strengths, weaknesses, and improvement insights, exported as a PDF.",
                  image: Download_PDF_Repo
                },
                {
                  icon: <BsClock size={20} />,
                  tag: "HISTORY",
                  title: "History & analytics",
                  description: "Track your progress over time with performance graphs and topic analysis.",
                  image: History_Analysis
                },
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.015 }}
                  className='bg-white border border-[#171512]/10 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-[#D98C2B]/40 transition-all'>
                  <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-64 rounded-xl' />
                    </div>
                    <div className='w-full md:w-1/2'>
                      <span className='font-mono text-[11px] tracking-widest text-[#D98C2B]'>{item.tag}</span>
                      <div className='bg-[#171512] text-[#D98C2B] w-12 h-12 rounded-xl flex items-center justify-center my-4'>
                        {item.icon}
                      </div>
                      <h3 className='font-display font-medium mb-3 text-xl'>{item.title}</h3>
                      <p className='text-sm text-[#6B6560] leading-relaxed'>{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>

        {/* Interview Modes Section — previously a duplicate of the section above */}
        <div className='mb-24 max-w-5xl mx-auto'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='font-display text-4xl font-medium text-center mb-4'>
            Multiple interview{" "}
            <span className='text-[#D98C2B]'>modes</span>
          </motion.h2>
          <p className='text-center text-[#6B6560] max-w-lg mx-auto mb-14'>
            Switch the format depending on what you're prepping for this week.
          </p>

          <div className='grid sm:grid-cols-2 gap-6'>
            {
              [
                {
                  icon: <BsCodeSlash size={20} />,
                  title: "Technical round",
                  description: "System design and coding questions matched to your stack."
                },
                {
                  icon: <BsChatDots size={20} />,
                  title: "Behavioral / HR",
                  description: "STAR-style questions on teamwork, conflict, and ownership."
                },
                {
                  icon: <BsPeople size={20} />,
                  title: "Case study & GD",
                  description: "Open-ended problems that mirror group discussion rounds."
                },
                {
                  icon: <BsLightningCharge size={20} />,
                  title: "Rapid fire",
                  description: "Short, fast questions to sharpen your on-the-spot thinking."
                },
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -3 }}
                  className='bg-[#171512] text-[#F6F5F2] rounded-2xl p-7 flex items-start gap-5 hover:shadow-xl transition-all'>
                  <div className='bg-[#F6F5F2]/10 text-[#D98C2B] w-11 h-11 rounded-xl flex items-center justify-center shrink-0'>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className='font-display font-medium mb-1.5 text-lg'>{item.title}</h3>
                    <p className='text-sm text-[#F6F5F2]/60 leading-relaxed'>{item.description}</p>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>

      </div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      
    </div>
  )
}

export default Home
