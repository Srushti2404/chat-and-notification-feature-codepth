import { CloseRounded } from '@mui/icons-material'

export default function MediaPreview({ src, closePreview }) {
  if (!src) return null

  return (
    <div className="mediaPreview">
      <CloseRounded onClick={closePreview} />
      <img src={src} alt="preview" /> {/* Fix the missing double quote */}
    </div>
  )
}
