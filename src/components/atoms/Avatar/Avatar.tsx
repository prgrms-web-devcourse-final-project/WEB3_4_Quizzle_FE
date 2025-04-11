import type React from "react"
// Remove SCSS import
// import './Avatar.scss';

export interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User avatar", size = "md", className = "", style, onClick }) => {
  // Size dimensions
  const sizes = {
    sm: 32,
    md: 40,
    lg: 56,
  }

  // Inline styles to replace SCSS
  const avatarStyle: React.CSSProperties = {
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#e9ecef",
    width: `${sizes[size]}px`,
    height: `${sizes[size]}px`,
    ...style,
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }

  const placeholderStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    color: "#6c757d",
  }

  return (
    <div className={`avatar ${className}`} style={avatarStyle} onClick={onClick}>
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} style={imageStyle} />
      ) : (
        <div style={placeholderStyle}>{alt.charAt(0).toUpperCase()}</div>
      )}
    </div>
  )
}

export default Avatar

