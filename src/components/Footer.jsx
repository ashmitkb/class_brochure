import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

const contacts = [
  { name: 'Dr. Vinay M', phone: '+91 99863 88234', email: 'vinay.m@christuniversity.in' },
  { name: 'Dr. Balakrishnan C', phone: '+91 98657 82529', email: 'balakrishnan.c@christuniversity.in' },
  { name: 'Dr. Sindhu V', phone: '+91 97155 52225', email: 'sindhu.v@christuniversity.in' },
]

const CAMPUS_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Christ+University+Yeshwanthpur+Campus+Bengaluru'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-grid">
        <div className="footer-address">
          <h3>Christ (Deemed to be University) BYC</h3>
          <p className="footer-address-line">Department of Computer Science</p>
          <p className="footer-address-line">School of Sciences</p>
          <p className="footer-address-line">Bangalore Yeshwanthpur Campus</p>
          <a href={CAMPUS_MAP_URL} target="_blank" rel="noreferrer" className="footer-map-link">
            <MapPin size={15} /> Reach the Campus
          </a>
        </div>

        {contacts.map((c) => (
          <div className="footer-contact-col" key={c.name}>
            <p className="footer-contact-name">{c.name}</p>
            <a href={`tel:${c.phone.replace(/\s+/g, '')}`} className="footer-contact-row">
              <Phone size={14} /> {c.phone}
            </a>
            <a href={`mailto:${c.email}`} className="footer-contact-row">
              <Mail size={14} /> {c.email}
            </a>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>
          © {year} CHRIST (Deemed to be University) (BYC) &middot; Department of Computer Science, School of Sciences
        </p>
        <p className="footer-credit">
          Designed and Developed by <span>Ashmit Kiran Bhandary</span>
        </p>
      </div>
    </footer>
  )
}
