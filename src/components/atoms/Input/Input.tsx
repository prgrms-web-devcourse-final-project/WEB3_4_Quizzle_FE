"use client"

import type React from "react"
// Remove SCSS import
// import './Input.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input: React.FC<InputProps> = ({ label, error, fullWidth = true, className = "", id, style, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

  // Inline styles to replace SCSS
  const wrapperStyle: React.CSSProperties = {
    marginBottom: "1rem",
    ...(fullWidth && { width: "100%" }),
    ...style,
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 500,
    color: "#495057",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: `1px solid ${error ? "red" : "#dee2e6"}`,
    borderRadius: "0.5rem",
    fontSize: "1rem",
  }

  const errorStyle: React.CSSProperties = {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    color: "red",
  }

  return (
    <div style={wrapperStyle} className={className}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={inputStyle}
        {...props}
        onFocus={(e) => {
          e.currentTarget.style.outline = "none"
          e.currentTarget.style.borderColor = "#5e3bee"
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(94, 59, 238, 0.2)"
          if (props.onFocus) props.onFocus(e)
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none"
          e.currentTarget.style.borderColor = error ? "red" : "#dee2e6"
          if (props.onBlur) props.onBlur(e)
        }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}

export default Input

