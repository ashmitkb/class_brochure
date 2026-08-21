// Lets a student swap their own resume straight from the live site instead
// of sending a new PDF to whoever runs the site. Static hosting (GitHub
// Pages / Vercel) has nowhere to receive an upload, so the file goes to
// Cloudinary's free tier instead — the cloud name and "unsigned" upload
// preset below are meant to be public. Cloudinary's unsigned-upload flow is
// designed to be called straight from the browser with no secret key, so
// there's nothing sensitive being exposed here. The preset itself (set in
// the Cloudinary dashboard) is what actually authorizes the upload.
const CLOUD_NAME = 'uhtn9lvp'
const UPLOAD_PRESET = 'class_brochure_resumes'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`

// Generous but not unlimited — resumes are usually well under 1MB, this
// just stops someone from accidentally (or deliberately) uploading
// something huge and eating into the free monthly storage/bandwidth quota.
export const MAX_RESUME_BYTES = 10 * 1024 * 1024

export function isPdfFile(file) {
  if (!file) return false
  if (file.type === 'application/pdf') return true
  return /\.pdf$/i.test(file.name || '')
}

// Uploads a PDF and resolves to its public, permanent URL. Throws on any
// non-2xx response or network failure — callers should catch this the same
// way they already catch saveOverride() failures.
export async function uploadResume(file) {
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)

  let res
  try {
    res = await fetch(UPLOAD_URL, { method: 'POST', body: form })
  } catch {
    throw new Error('Could not reach the file upload service. Check your connection and try again.')
  }

  if (!res.ok) {
    throw new Error('The resume upload failed. Please try again in a moment.')
  }

  const data = await res.json()
  if (!data.secure_url) {
    throw new Error('The resume upload did not return a usable link. Please try again.')
  }
  return data.secure_url
}
