import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Mail, Link2, GraduationCap, Code2, Users, FolderGit2, Award,
  IdCard, Pencil, ExternalLink, Download, FileText,
} from 'lucide-react'
// lucide-react's brand icons (Github, Linkedin, etc.) aren't included in
// this package version, so Direct Channels uses a generic external-link
// glyph for both — the label text is what tells them apart.
import { classInfo } from '../data/students'
import { withOverrides } from '../utils/studentOverrides'
import { useOverrides } from '../context/OverridesContext'
import { assetUrl } from '../utils/assetUrl'
import ResumeViewer from './ResumeViewer'
import EditProfileModal from './EditProfileModal'
import MailChooser from './MailChooser'
import './StudentProfile.css'

// Full-page profile view — replaces the old slide-over drawer. Rendered as
// a page-level swap by App.jsx (not layered on top of the site), so the
// floating glass navbar never sits over it.
export default function StudentProfile({ student, onBack }) {
  const [activeSection, setActiveSection] = useState('about')
  const [view, setView] = useState('summary') // 'summary' | 'resume'
  const [editing, setEditing] = useState(false)
  const [inquiry, setInquiry] = useState({ name: '', company: '', email: '', message: '' })
  const sectionRefs = useRef({})
  const contactFormRef = useRef(null)

  // Firestore-backed edits (see OverridesContext) layered on top of the
  // base student record. Recomputing this from the live overrides map —
  // rather than copying it into local state once — is what makes a save
  // in EditProfileModal (or another visitor's edit) show up here
  // immediately, no reload needed.
  const overrides = useOverrides()
  const activeStudent = useMemo(() => withOverrides(student, overrides), [student, overrides])

  const sections = [
    { id: 'about', label: 'About', icon: IdCard, show: true },
    { id: 'skills', label: 'Skills', icon: Code2, show: true },
    { id: 'education', label: 'Education', icon: GraduationCap, show: true },
    { id: 'projects', label: 'Projects', icon: FolderGit2, show: activeStudent.projects?.length > 0 },
    { id: 'certifications', label: 'Certifications', icon: Award, show: activeStudent.certifications?.length > 0 },
    { id: 'contact', label: 'Contact', icon: Users, show: true },
  ].filter((s) => s.show)

  useEffect(() => {
    window.scrollTo(0, 0)
    setView('summary')
  }, [student])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0.1 }
    )

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [student, activeStudent])

  const goTo = (id) => {
    setView('summary')
    // The section refs only exist once the summary view is actually
    // mounted, so give it a frame before trying to scroll to one —
    // matters when this is clicked while the Resume tab is showing.
    requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const resumeUrl = activeStudent.resumeFile ? assetUrl(activeStudent.resumeFile) : null

  const handleInquiryChange = (field) => (e) =>
    setInquiry((f) => ({ ...f, [field]: e.target.value }))

  const inquirySubject = `Recruitment inquiry for ${activeStudent.name}${inquiry.company ? ` (${inquiry.company})` : ''}`
  const inquiryBody =
    `From: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ''}\n` +
    `Reply-to: ${inquiry.email}\n\n${inquiry.message}`

  const linkedinHref = activeStudent.linkedin
    ? (activeStudent.linkedin.startsWith('http') ? activeStudent.linkedin : `https://${activeStudent.linkedin}`)
    : null
  const githubHref = activeStudent.github
    ? (activeStudent.github.startsWith('http') ? activeStudent.github : `https://${activeStudent.github}`)
    : null

  return (
    <div className="profile-page">
      <header className="profile-topbar">
        <button className="profile-back" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to Directory
        </button>
        <div className="profile-topbar-right">
          <span className="mono profile-topbar-class">
            {classInfo.name} &middot; Batch {classInfo.batch}
          </span>
          <button
            className="profile-edit-trigger"
            onClick={() => setEditing(true)}
            aria-label="Edit this profile"
            title="Edit this profile"
          >
            <Pencil size={16} />
          </button>
        </div>
      </header>

      <div className="profile-body">
        <aside className="profile-sidebar">
          <div className="profile-identity">
            <div className="profile-photo-box">
              <img src={assetUrl(activeStudent.photo)} alt={activeStudent.name} />
            </div>
            <h1 className="profile-name">{activeStudent.name}</h1>
            <p className="profile-tagline">{activeStudent.tagline}</p>
          </div>

          <nav className="profile-nav">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`profile-nav-link ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => goTo(s.id)}
              >
                <s.icon size={15} />
                {s.label}
              </button>
            ))}
          </nav>

          <div className="profile-sidebar-footer">
            <span className="mono">CLASS {classInfo.batch}</span>
          </div>
        </aside>

        <main className={`profile-main ${view === 'resume' ? 'profile-main-wide' : ''}`}>
          <div className="profile-view-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'summary'}
              className={`profile-view-tab ${view === 'summary' ? 'active' : ''}`}
              onClick={() => setView('summary')}
            >
              Profile Summary
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'resume'}
              className={`profile-view-tab ${view === 'resume' ? 'active' : ''}`}
              onClick={() => setView('resume')}
            >
              Resume
            </button>
          </div>

          {view === 'resume' ? (
            <div className="profile-resume-view">
              {resumeUrl ? (
                <>
                  <div className="profile-resume-toolbar">
                    <p className="profile-resume-hint">
                      <FileText size={15} /> {activeStudent.name}'s full resume, as submitted.
                    </p>
                    <a href={resumeUrl} download className="profile-resume-download">
                      <Download size={15} /> Download PDF
                    </a>
                  </div>
                  <ResumeViewer url={resumeUrl} title={activeStudent.name} />
                  <p className="profile-resume-fallback">
                    Not loading? <a href={resumeUrl} target="_blank" rel="noreferrer">Open the resume in a new tab</a> instead.
                  </p>
                </>
              ) : (
                <p className="profile-contact-empty">No resume on file for this profile yet.</p>
              )}
            </div>
          ) : (
          <>
          <motion.section
            id="about"
            ref={(el) => (sectionRefs.current.about = el)}
            className="profile-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mono profile-eyebrow">ABOUT</p>
            <div className="profile-card">
              <p className="profile-bio">{activeStudent.bio}</p>
            </div>
          </motion.section>

          <motion.section
            id="skills"
            ref={(el) => (sectionRefs.current.skills = el)}
            className="profile-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <p className="mono profile-eyebrow">SKILLS</p>
            <div className="profile-card profile-skills-grid">
              <div>
                <p className="profile-card-label">Technical Skills</p>
                <div className="profile-tags">
                  {activeStudent.technicalSkills.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="profile-card-label">Professional Skills</p>
                <div className="profile-tags">
                  {activeStudent.professionalSkills.map((t) => (
                    <span key={t} className="alt">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="education"
            ref={(el) => (sectionRefs.current.education = el)}
            className="profile-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <p className="mono profile-eyebrow">EDUCATION</p>
            <div className="profile-card profile-timeline">
              <div className="profile-timeline-item">
                <span className="profile-timeline-dot" />
                <div>
                  <p className="profile-timeline-title">{classInfo.program}</p>
                  <p className="profile-timeline-sub">{classInfo.department} &middot; Batch {classInfo.batch}</p>
                </div>
              </div>
              <div className="profile-timeline-item">
                <span className="profile-timeline-dot" />
                <div>
                  <p className="profile-timeline-title">{activeStudent.priorEducation}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {activeStudent.projects?.length > 0 && (
            <motion.section
              id="projects"
              ref={(el) => (sectionRefs.current.projects = el)}
              className="profile-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
            >
              <p className="mono profile-eyebrow">PROJECTS</p>
              <div className="profile-project-list">
                {activeStudent.projects.map((p) => (
                  <div className="profile-card profile-project" key={p.title}>
                    <p className="profile-project-title">{p.title}</p>
                    <p className="profile-project-desc">{p.desc}</p>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="profile-project-link">
                        <Link2 size={13} /> View project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeStudent.certifications?.length > 0 && (
            <motion.section
              id="certifications"
              ref={(el) => (sectionRefs.current.certifications = el)}
              className="profile-section"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
            >
              <p className="mono profile-eyebrow">CERTIFICATIONS</p>
              <div className="profile-card">
                <ul className="profile-cert-list">
                  {activeStudent.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          <motion.section
            id="contact"
            ref={(el) => (sectionRefs.current.contact = el)}
            className="profile-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <p className="mono profile-eyebrow">CONTACT</p>
            <div className="profile-contact-grid">
              <div className="profile-card profile-contact-form-card">
                <p className="profile-card-label">Send a Recruitment Message</p>

                {activeStudent.email ? (
                  <form
                    ref={contactFormRef}
                    className="profile-contact-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label>
                      <span>Your Name*</span>
                      <input required value={inquiry.name} onChange={handleInquiryChange('name')} />
                    </label>
                    <label>
                      <span>Company*</span>
                      <input required value={inquiry.company} onChange={handleInquiryChange('company')} />
                    </label>
                    <label>
                      <span>Business Email*</span>
                      <input type="email" required value={inquiry.email} onChange={handleInquiryChange('email')} />
                    </label>
                    <label>
                      <span>Message*</span>
                      <textarea required rows={4} value={inquiry.message} onChange={handleInquiryChange('message')} />
                    </label>
                    <MailChooser
                      to={activeStudent.email}
                      subject={inquirySubject}
                      body={inquiryBody}
                      label="Send Inquiry"
                      onBeforeOpen={() => contactFormRef.current?.reportValidity()}
                      className="profile-contact-send-wrap"
                    />
                    <p className="profile-contact-form-note">
                      Pick your email provider. It opens pre-filled and addressed straight to {activeStudent.name}.
                    </p>
                  </form>
                ) : (
                  <p className="profile-contact-empty">No email on file for this profile yet, so messages can't be routed.</p>
                )}
              </div>

              <div className="profile-card profile-contact-channels">
                <p className="profile-card-label">Direct Channels</p>
                {activeStudent.email && (
                  <MailChooser
                    to={activeStudent.email}
                    label={activeStudent.email}
                    icon={Mail}
                    variant="link"
                    className="profile-contact-link-wrap"
                  />
                )}
                {linkedinHref && (
                  <a href={linkedinHref} target="_blank" rel="noreferrer" className="profile-contact-link">
                    <ExternalLink size={16} /> LinkedIn
                  </a>
                )}
                {githubHref && (
                  <a href={githubHref} target="_blank" rel="noreferrer" className="profile-contact-link">
                    <ExternalLink size={16} /> GitHub
                  </a>
                )}
                {!activeStudent.email && !linkedinHref && !githubHref && (
                  <p className="profile-contact-empty">No contact details on file yet.</p>
                )}
              </div>
            </div>
          </motion.section>
          </>
          )}
        </main>
      </div>

      {editing && (
        <EditProfileModal
          student={activeStudent}
          onClose={() => setEditing(false)}
          onSaved={() => setEditing(false)}
        />
      )}
    </div>
  )
}
