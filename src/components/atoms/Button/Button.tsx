import type React from "react"
// Remove SCSS import
// import './Button.scss';

export type ButtonVariant = "primary" | "secondary" | "outline" | "text"
export type ButtonSize = "sm" | "md" | "lg"

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

const Button: React.FC<IButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    border: "none",
    cursor: "pointer",
    ...(fullWidth && { width: "100%" }),
  }

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: "0.25rem 0.5rem", fontSize: "0.875rem" },
    md: { padding: "0.5rem 1rem", fontSize: "1rem" },
    lg: { padding: "0.75rem 1.5rem", fontSize: "1.25rem" },
  }

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: "#5e3bee",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "#e9ecef",
      color: "#343a40",
    },
    outline: {
      backgroundColor: "transparent",
      border: "1px solid #5e3bee",
      color: "#5e3bee",
    },
    text: {
      backgroundColor: "transparent",
      color: "#5e3bee",
    },
  }

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  }

  if (props.disabled) {
    combinedStyle.opacity = 0.6
    combinedStyle.cursor = "not-allowed"
  }

  return (
    <button
      className={`button ${className}`}
      style={combinedStyle}
      {...props}
      onMouseOver={(e) => {
        if (!props.disabled) {
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "#4a2bd6"
          } else if (variant === "secondary") {
            e.currentTarget.style.backgroundColor = "#dee2e6"
          } else if (variant === "outline" || variant === "text") {
            e.currentTarget.style.backgroundColor = "rgba(94, 59, 238, 0.1)"
          }
        }
      }}
      onMouseOut={(e) => {
        if (!props.disabled) {
          if (variant === "primary") {
            e.currentTarget.style.backgroundColor = "#5e3bee"
          } else if (variant === "secondary") {
            e.currentTarget.style.backgroundColor = "#e9ecef"
          } else if (variant === "outline" || variant === "text") {
            e.currentTarget.style.backgroundColor = "transparent"
          }
        }
      }}
    >
      {children}
    </button>
  )
}

export default Button

