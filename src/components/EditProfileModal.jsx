import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Pencil, TriangleAlert } from 'lucide-react'
import { EDIT_PASSWORD, saveOverride } from '../utils/studentOverrides'
import './EditProfileModal.css'

const splitList = (text) =>
  text.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)

const splitLines = (text) =>
  text.split('\n').map((s) => s.trim()).filter(Boolean)

// Projects are edited as plain lines "Title | Description | Link" so the
// form stays a few text fields instead of a repeating add/remove-row UI.
// The link segment is optional.
const parseProjects = (text) =>
  splitLines(text).map((line) => {
    const [title, desc, link] = line.split('|').map((s) => (s || '').trim())
    return { title: title || 'Untitled project', desc: desc || '', link: link || '' }
  })

const projectsToText = (projects = []) =>
  projects.map((p) => [p.title, p.desc, p.link].filter(Boolean).join(' | ')).join('\n')

export default function EditProfileModal({ student, onClose, onSaved }) {
  const [step, setStep] = useState('login') // 'login' | 'edit'
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [form, setForm] = useState(() => ({
    tagline: student.tagline || '',
    bio: student.bio || '',
    priorEducation: student.priorEducation || '',
    technicalSkills: (student.technicalSkills || []).join(', '),
    professionalSkills: (student.professionalSkills || []).join(', '),
    certifications: (student.certifications || []).join('\n'),
    projects: projectsToText(student.projects),
    email: student.email || '',
    linkedin: student.linkedin || '',
    github: student.github || '',
  }))

  const handleLogin = (e) => {
    e.preventDefault()
    if (!student.email) {
      setLoginError("There's no email on file for this profile yet, so self-edit login can't be verified. Ask whoever manages the site to add your email first.")
      return
    }
    const emailMatches = loginEmail.trim().toLowerCase() === student.email.trim().toLowerCase()
    const passwordMatches = loginPassword === EDIT_PASSWORD
    if (!emailMatches || !passwordMatches) {
      setLoginError('That email/password combination doesn’t match this profile.')
      return
    }
    setLoginError('')
    setStep('edit')
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    const data = {
      tagline: form.tagline.trim(),
      bio: form.bio.trim(),
      priorEducation: form.priorEducation.trim(),
      technicalSkills: splitList(form.technicalSkills),
      professionalSkills: splitList(form.professionalSkills),
      certifications: splitLines(form.certifications),
      projects: parseProjects(form.projects),
      email: form.email.trim(),
      linkedin: form.linkedin.trim(),
      github: form.github.trim(),
    }
    setSaving(true)
    setSaveError('')
    // Writes to Firestore (see studentOverrides.js) — the profile page's
    // own live subscription picks the change back up and re-renders, so
    // there's nothing to do here on success besides closing the modal.
    saveOverride(student.id, data)
      .then(() => onSaved())
      .catch((err) => {
        setSaving(false)
        setSaveError(err.message || 'Could not save. Check your connection and try again.')
      })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="edit-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="edit-modal"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="edit-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>

          {step === 'login' && (
            <form onSubmit={handleLogin} className="edit-modal-body">
              <div className="edit-modal-icon"><Lock size={20} /></div>
              <h2>Edit your profile</h2>
              <p className="edit-modal-sub">Log in as {student.name} to update your own details.</p>

              <label className="edit-field">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="the email on your profile"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </label>

              <label className="edit-field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="shared class password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </label>

              {loginError && (
                <p className="edit-modal-error"><TriangleAlert size={14} /> {loginError}</p>
              )}

              <p className="edit-modal-note">
                Saved changes are visible to everyone who visits the site,
                not just this browser. There's no real login behind this
                though (just this shared password), so treat it as a soft
                gate rather than a guarantee only you can edit your profile.
              </p>

              <button type="submit" className="edit-modal-submit">Log in</button>
            </form>
          )}

          {step === 'edit' && (
            <form onSubmit={handleSave} className="edit-modal-body edit-modal-body-wide">
              <div className="edit-modal-icon"><Pencil size={20} /></div>
              <h2>Update your details</h2>
              <p className="edit-modal-sub">Changes save to the live site for everyone.</p>

              <label className="edit-field">
                <span>Tagline</span>
                <input value={form.tagline} onChange={update('tagline')} />
              </label>

              <label className="edit-field">
                <span>Bio</span>
                <textarea rows={4} value={form.bio} onChange={update('bio')} />
              </label>

              <label className="edit-field">
                <span>Prior education</span>
                <input value={form.priorEducation} onChange={update('priorEducation')} />
              </label>

              <label className="edit-field">
                <span>Technical skills (comma-separated)</span>
                <input value={form.technicalSkills} onChange={update('technicalSkills')} />
              </label>

              <label className="edit-field">
                <span>Professional skills (comma-separated)</span>
                <input value={form.professionalSkills} onChange={update('professionalSkills')} />
              </label>

              <label className="edit-field">
                <span>Certifications (one per line)</span>
                <textarea rows={3} value={form.certifications} onChange={update('certifications')} />
              </label>

              <label className="edit-field">
                <span>Projects (one per line: Title | Description | Link)</span>
                <textarea rows={4} value={form.projects} onChange={update('projects')} />
              </label>

              <label className="edit-field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={update('email')} />
              </label>

              <label className="edit-field">
                <span>LinkedIn URL</span>
                <input value={form.linkedin} onChange={update('linkedin')} />
              </label>

              <label className="edit-field">
                <span>GitHub URL</span>
                <input value={form.github} onChange={update('github')} />
              </label>

              {saveError && (
                <p className="edit-modal-error"><TriangleAlert size={14} /> {saveError}</p>
              )}

              <button type="submit" className="edit-modal-submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
