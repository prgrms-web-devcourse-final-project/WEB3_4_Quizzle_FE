import type React from "react"
// Remove SCSS import
// import './Card.scss';

export interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Card: React.FC<CardProps> = ({ children, className = "", style }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1), 0 1px 5px rgba(0, 0, 0, 0.06)",
    padding: "1rem",
    width: "100%",
    ...style,
  }

  return (
    <div className={`card ${className}`} style={cardStyle}>
      {children}
    </div>
  )
}

export default Card

