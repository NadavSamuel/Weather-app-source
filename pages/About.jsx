import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export function About() {
  const { wasInitialLoad } = useSelector(state => state.systemReducer)

  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const pageTransition = {
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: '100%',
    }
  }
  return (
    <motion.section className="about-container flex column align-center" variants={pageTransition} transition={{ duration: 0.5 }} exit="out" animate="in" initial={wasInitialLoad ? 'out' : null}>
      <div className="profile-img-container flex justify-center">
        <img src={require('../assets/imgs/profile.jpg')} alt="" />
      </div>
      <div className="personal-txt-container">
        <h1>Hi! my name is Nadav Samuel and i'm a <span>Full-Stack</span> developer!</h1>
        <p> I'm 22 years old, born in Givaataim, Israel.
        Motivational fullstack web developer. People person and a team player.
        <br />
          <br />
          <a target="_blank" href="https://nadav-samuel-portfolio.herokuapp.com/#/"> Check out my portfolio!</a>
          <br />
          <br />
          <a target="_blank" href="https://www.linkedin.com/in/nadav-samuel-0b51291b9/"> Check out my linkedin page!</a>
          <br />
          <br />
          <span>samuelna9@gmail.com </span>

        </p>
      </div>


    </motion.section >
  )
}