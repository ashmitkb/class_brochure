import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import MailChooser from './MailChooser'
import './PlacementEnquiry.css'

const PLACEMENTS_EMAIL = 'cs.placements@christuniversity.in'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// No form here on purpose — a "submit and hope it's wired up" enquiry
// form isn't better than just handing recruiters the placements inbox
// directly, so this points straight at cs.placements@christuniversity.in.
export default function PlacementEnquiry() {
  return (
    <section className="enquiry-section" id="enquiry">
      <motion.div
        className="enquiry-head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        <h2>Placement Enquiry</h2>
        <p>
          Interested in recruiting from the Department of Computer Science? Reach out directly
          to the placements team and they'll take it from there.
        </p>

        <MailChooser
          to={PLACEMENTS_EMAIL}
          subject="Placement Enquiry — Department of Computer Science"
          label={PLACEMENTS_EMAIL}
          icon={Mail}
          className="enquiry-mail"
        />
      </motion.div>
    </section>
  )
}
