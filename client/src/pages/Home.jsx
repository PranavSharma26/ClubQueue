import React from 'react'
import { Navbar } from '../components/Navbar'
import { PinkContainer } from '../components/PinkContainer'
import Footer from '../components/Footer'
import { EventContainer } from '../components/EventContainer'

export const Home = () => {
  return (
    <>
        <Navbar/>
        <PinkContainer/>
        <EventContainer/>
        <Footer/>
    </>
  )
}
