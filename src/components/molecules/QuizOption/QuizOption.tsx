"use client"

import type React from "react"
// Remove SCSS import
// import './QuizOption.scss';

export interface QuizOptionProps {
  label: string
  value: string
  selected?: boolean
  onClick?: () => void
}

const QuizOption: React.FC<QuizOptionProps> = ({ label, value, selected = false, onClick }) => {
  // Inline styles to replace SCSS
  const quizOptionStyle = {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "flex-start" as const,
    alignItems: "center" as const,
    padding: "0.75rem 1rem",
    border: `1px solid ${selected ? "#5e3bee" : "#dee2e6"}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "0.75rem",
    backgroundColor: selected ? "rgba(94, 59, 238, 0.1)" : "transparent",
  }

  const prefixStyle = {
    fontWeight: "bold" as const,
    marginRight: "0.75rem",
    color: "#5e3bee",
  }

  const labelStyle = {
    flex: 1,
  }

  return (
    <div
      style={quizOptionStyle}
      onClick={onClick}
      onMouseOver={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#7857f7"
          e.currentTarget.style.backgroundColor = "rgba(94, 59, 238, 0.05)"
        }
      }}
      onMouseOut={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#dee2e6"
          e.currentTarget.style.backgroundColor = "transparent"
        }
      }}
    >
      <div style={prefixStyle}>{value}.</div>
      <div style={labelStyle}>{label}</div>
    </div>
  )
}

export default QuizOption

