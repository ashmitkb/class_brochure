import { useEffect, useRef, useState } from 'react'
import { Send, ChevronDown } from 'lucide-react'
import { buildMailLinks } from '../utils/mailCompose'
import './MailChooser.css'

// A small "Send" trigger that opens a dropdown of webmail providers
// (Gmail, Outlook.com, Yahoo, or whatever the OS default is) instead of
// silently launching whichever mail app happens to be the OS default.
//
// `onBeforeOpen` is used by the recruitment-message form to run the
// browser's native required-field validation (via reportValidity()) —
// if it returns false, the dropdown doesn't open, mirroring how a real
// submit button would block on invalid fields.
export default function MailChooser({
  to,
  subject = '',
  body = '',
  label = 'Send',
  icon: Icon = Send,
  onBeforeOpen,
  variant = 'button',
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const links = buildMailLinks({ to, subject, body })

  const handleTriggerClick = () => {
    if (onBeforeOpen && !onBeforeOpen()) return
    setOpen((o) => !o)
  }

  return (
    <div className={`mail-chooser ${className}`} ref={ref}>
      <button
        type="button"
        className={variant === 'link' ? 'mail-chooser-link-trigger' : 'mail-chooser-button-trigger'}
        onClick={handleTriggerClick}
      >
        <Icon size={variant === 'link' ? 16 : 15} />
        {label}
        <ChevronDown size={13} className="mail-chooser-chevron" />
      </button>

      {open && (
        <div className="mail-chooser-menu">
          <p className="mail-chooser-menu-label">Open in&hellip;</p>
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              target={l.key === 'default' ? undefined : '_blank'}
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
