"use client"

import type React from "react"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string
    checked?: boolean
    onChange?: (checked: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({
    label,
    checked = false,
    onChange,
    className = "",
    id,
    style,
    ...props
}) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`

    const wrapperStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        ...style,
    }

    const switchStyle: React.CSSProperties = {
        position: "relative",
        width: "3rem",
        height: "1.5rem",
    }

    const inputStyle: React.CSSProperties = {
        position: "absolute",
        opacity: 0,
        width: "0",
        height: "0",
    }

    const sliderStyle: React.CSSProperties = {
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: checked ? "#5e3bee" : "#e9ecef",
        transition: "0.4s",
        borderRadius: "1.5rem",
    }

    const knobStyle: React.CSSProperties = {
        position: "absolute",
        content: '""',
        height: "1.25rem",
        width: "1.25rem",
        left: "0.125rem",
        bottom: "0.125rem",
        backgroundColor: "white",
        transition: "0.4s",
        borderRadius: "50%",
        transform: checked ? "translateX(1.5rem)" : "translateX(0)",
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.checked)
        }
    }

    return (
        <div style={wrapperStyle} className={className}>
            <label style={switchStyle} htmlFor={switchId}>
                <input
                    type="checkbox"
                    id={switchId}
                    checked={checked}
                    onChange={handleChange}
                    style={inputStyle}
                    {...props}
                />
                <span style={sliderStyle}>
                    <span style={knobStyle} />
                </span>
            </label>
            {label && <span>{label}</span>}
        </div>
    )
}

export default Switch 