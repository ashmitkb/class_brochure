import { AnimatePresence, motion } from 'framer-motion'
import { X, Mail, Link2 } from 'lucide-react'
import './ProfileDrawer.css'

export default function ProfileDrawer({ student, onClose }) {
  return (
    <AnimatePresence>
      {student && (
        <motion.div
          className="drawer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="drawer-close" onClick={onClose} aria-label="Close profile">
              <X size={20} />
            </button>

            <div className="drawer-header">
              <div className="drawer-photo">
                <img src={student.photo} alt={student.name} />
              </div>
              <div>
                <h3>{student.name}</h3>
                <p className="drawer-tagline">{student.tagline}</p>
              </div>
            </div>

            <div className="drawer-section">
              <p className="mono drawer-label">ABOUT</p>
              <p className="drawer-bio">{student.bio}</p>
            </div>

            <div className="drawer-grid">
              <div>
                <p className="mono drawer-label">PRIOR EDUCATION</p>
                <p>{student.priorEducation}</p>
              </div>
            </div>

            <div className="drawer-skills-block">
              <p className="mono drawer-label drawer-skills-heading">TECHNICAL SKILLS</p>
              <div className="drawer-tags">
                {student.technicalSkills.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            <div className="drawer-skills-block">
              <p className="mono drawer-label drawer-skills-heading">PROFESSIONAL SKILLS</p>
              <div className="drawer-tags">
                {student.professionalSkills.map((t) => <span key={t} className="alt">{t}</span>)}
              </div>
            </div>

            {student.projects?.length > 0 && (
              <div className="drawer-section">
                <p className="mono drawer-label">PROJECTS</p>
                {student.projects.map((p) => (
                  <div className="drawer-project" key={p.title}>
                    <p className="drawer-project-title">{p.title}</p>
                    <p className="drawer-project-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {student.certifications?.length > 0 && (
              <div className="drawer-section">
                <p className="mono drawer-label">CERTIFICATIONS</p>
                <p>{student.certifications.join(', ')}</p>
              </div>
            )}

            <div className="drawer-contact">
              {student.email && (
                <a href={`mailto:${student.email}`} className="drawer-contact-link">
                  <Mail size={16} /> {student.email}
                </a>
              )}
              {student.linkedin && (
                <a href={student.linkedin} target="_blank" rel="noreferrer" className="drawer-contact-link">
                  <Link2 size={16} /> LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
