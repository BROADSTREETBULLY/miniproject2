import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AppRoutes from './AppRoutes'
import NavBar from './components/NavBar'


function App() {
  return (
    <>
    <NavBar></NavBar>
    <AppRoutes></AppRoutes></>
  )
}

export default App
