import { motion } from 'framer-motion'
import {
  Code2, Database, Smartphone, BrainCircuit, Cloud, BarChart3, FlaskConical,
  Trophy, ShieldCheck, Users2, CalendarClock,
} from 'lucide-react'
import './ProgramOverview.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const curriculum = [
  { icon: Code2, label: 'Programming & Software Development' },
  { icon: Database, label: 'Data Structures & Database Systems' },
  { icon: Smartphone, label: 'Web & Mobile App Development' },
  { icon: BrainCircuit, label: 'AI & Machine Learning' },
  { icon: Cloud, label: 'Cloud Computing & Cybersecurity' },
  { icon: BarChart3, label: 'Data Analytics & Visualization' },
  { icon: FlaskConical, label: 'Research Methods & Emerging Tech' },
]

const facts = [
  { icon: Trophy, num: '#1', label: 'in India for BCA, India Today' },
  { icon: ShieldCheck, num: 'A+', label: 'NAAC accredited university' },
  { icon: Users2, num: '95%', label: 'consistent placement rate' },
  { icon: CalendarClock, num: '4 yrs', label: '8 semesters, full-time, day scholar' },
]

const outcomes = [
  'Software Developer', 'Data Analyst', 'AI / ML Engineer', 'Cybersecurity Analyst',
  'Cloud Specialist', 'Founder / Entrepreneur', 'Higher Studies',
]

export default function ProgramOverview() {
  return (
    <section className="program-section" id="programme">
      <motion.p
        className="mono cohort-eyebrow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        01 / THE PROGRAMME
      </motion.p>

      <div className="program-intro-row">
        <motion.div
          className="program-intro-text"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <h2 className="program-heading">
            A four-year Bachelor of Computer Applications,
            <br className="program-heading-break" /> built for the future of software.
          </h2>
          <p className="program-body">
            Bachelor of Computer Applications (Honours) at CHRIST (Deemed to be University),
            Bangalore Yeshwanthpur Campus is a future-focused undergraduate programme designed
            to develop skilled software professionals, pairing technical depth with ethical
            grounding and real industry readiness, across eight semesters of full-time,
            English-medium study. Students can specialise through BCA Honours, BCA Honours with
            Research, or focused tracks in AI, Data Science, Cloud Computing, and Cybersecurity.
          </p>
        </motion.div>

        <div className="program-fact-grid">
          {facts.map((f, i) => (
            <motion.div
              className="program-fact-card"
              key={f.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              transition={{ delay: 0.08 * i }}
            >
              <f.icon size={18} strokeWidth={1.75} />
              <span className="program-fact-num">{f.num}</span>
              <span className="program-fact-label">{f.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="program-curriculum"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <p className="program-block-label mono">CURRICULUM HIGHLIGHTS</p>
        <div className="program-curriculum-grid">
          {curriculum.map((c) => (
            <div className="program-curriculum-item" key={c.label}>
              <c.icon size={17} strokeWidth={1.75} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="program-outcomes"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <p className="program-block-label mono">WHERE GRADUATES GO</p>
        <div className="program-outcome-tags">
          {outcomes.map((o) => <span key={o}>{o}</span>)}
        </div>
      </motion.div>

      <p className="mono program-source">
        Source: CHRIST (Deemed to be University), Bangalore Yeshwanthpur Campus programme page; India Today BCA rankings.
      </p>
    </section>
  )
}
