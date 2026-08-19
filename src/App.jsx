import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import ProgramOverview from './components/ProgramOverview'
import AboutCohort from './components/AboutCohort'
import Directory from './components/Directory'
import PlacementEnquiry from './components/PlacementEnquiry'
import Footer from './components/Footer'
import StudentProfile from './components/StudentProfile'
import { OverridesProvider } from './context/OverridesContext'
import './components/Footer.css'

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  // Where the visitor was on the homepage when they opened a profile —
  // restored on the way back instead of dumping them at the top again.
  const savedScrollY = useRef(0)

  const handleSelectStudent = (student) => {
    savedScrollY.current = window.scrollY
    setSelectedStudent(student)
  }

  const handleBack = () => {
    setSelectedStudent(null)
    // Wait a frame so the homepage has regained its height before we
    // scroll — doing it synchronously would jump to a page that's still
    // collapsed from being display:none a moment ago.
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: 'auto' })
    })
  }

  return (
    <OverridesProvider>
      {/* The homepage stays mounted (just hidden) instead of being torn
          down while a profile is open — that's what keeps the directory's
          search text and skill filter intact, and the scroll restore above
          working, when the visitor goes back. */}
      <div id="top" style={{ display: selectedStudent ? 'none' : 'block' }}>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <ProgramOverview />
        <AboutCohort />
        <Directory onSelectStudent={handleSelectStudent} />
        <PlacementEnquiry />
        <Footer />
      </div>

      {selectedStudent && (
        <StudentProfile student={selectedStudent} onBack={handleBack} />
      )}
    </OverridesProvider>
  )
}
