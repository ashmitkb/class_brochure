// A plain `mailto:` link only ever opens whatever the OS has set as the
// default mail app (Outlook desktop, in this project's case) — it has no
// way to know someone actually lives in Gmail/Yahoo/Outlook.com in the
// browser. These build "compose" deep links for the major webmail
// providers plus a mailto: fallback, so the visitor can pick whichever
// one is actually theirs.
export function buildMailLinks({ to, subject = '', body = '' }) {
  const enc = encodeURIComponent
  return [
    {
      key: 'gmail',
      label: 'Gmail',
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
    },
    {
      key: 'outlook',
      label: 'Outlook.com',
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      key: 'yahoo',
      label: 'Yahoo Mail',
      href: `https://compose.mail.yahoo.com/?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
    },
    {
      key: 'default',
      label: 'Default Mail App',
      href: `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`,
    },
  ]
}
