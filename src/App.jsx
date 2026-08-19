import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import AboutCohort from './components/AboutCohort'
import Directory from './components/Directory'
import Footer from './components/Footer'
import './components/Footer.css'

export default function App() {
  return (
    <div id="top">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <AboutCohort />
      <Directory />
      <Footer />
    </div>
  )
}
