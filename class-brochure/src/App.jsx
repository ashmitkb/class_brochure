import Navbar from './components/Navbar'
import CinematicHero from './components/CinematicHero'
import AboutCohort from './components/AboutCohort'
import Directory from './components/Directory'
import Footer from './components/Footer'
import './components/Footer.css'

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <CinematicHero />
      <AboutCohort />
      <Directory />
      <Footer />
    </div>
  )
}
