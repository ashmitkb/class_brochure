import { motion } from 'framer-motion'
import { students, classInfo } from '../data/students'
import './AboutCohort.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function AboutCohort() {
  const total = students.length

  const skillCounts = {}
  students.forEach((s) => {
    s.technicalSkills.forEach((sk) => {
      skillCounts[sk] = (skillCounts[sk] || 0) + 1
    })
  })
  const topSkill = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]

  const projectCount = students.reduce((sum, s) => sum + (s.projects?.length || 0), 0)
  const certCount = students.reduce((sum, s) => sum + (s.certifications?.length || 0), 0)

  const stats = [
    { num: total, label: 'students, verified profiles' },
    { num: topSkill ? topSkill[1] : 0, label: topSkill ? `students know ${topSkill[0]}` : 'top skill' },
    { num: projectCount, label: 'projects documented' },
    { num: certCount, label: 'certifications earned' },
  ]

  return (
    <section className="cohort-section" id="stats">
      <motion.p
        className="mono cohort-eyebrow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        01 / ABOUT THE CLASS
      </motion.p>

      <motion.h2
        className="cohort-heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        One BCA section, four years,
        <br className="cohort-heading-break" /> way too many group projects.
      </motion.h2>

      <div className="cohort-meta-row">
        <div><span className="mono">PROGRAMME</span><p>{classInfo.program}</p></div>
        <div><span className="mono">DEPARTMENT</span><p>{classInfo.department}</p></div>
        <div><span className="mono">BATCH</span><p>{classInfo.batch}</p></div>
      </div>

      <div className="cohort-stat-row">
        {stats.map((s, i) => (
          <motion.div
            className={`cohort-stat ${i === 0 ? 'cohort-stat-big' : ''}`}
            key={s.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            transition={{ delay: 0.08 * i }}
          >
            <span className="cohort-stat-num mono">{s.num}</span>
            <span className="cohort-stat-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
