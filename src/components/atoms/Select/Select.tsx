"use client"

import type React from "react"
// Remove SCSS import
// import './Select.scss';

export interface SelectOption {
    value: string
    label: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
    options: SelectOption[]
    label?: string
    error?: boolean
    fullWidth?: boolean
    onChange?: (value: string) => void
}

const Select: React.FC<SelectProps> = ({
                                           options,
                                           label,
                                           error,
                                           fullWidth = true,
                                           className = "",
                                           id,
                                           onChange,
                                           style,
                                           ...props
                                       }) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`

    const wrapperStyle: React.CSSProperties = {
        marginBottom: "1rem",
        ...(fullWidth && {width: "100%"}),
        ...style,
    }

    const labelStyle: React.CSSProperties = {
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: 500,
        color: "#495057",
    }

    const selectWrapperStyle: React.CSSProperties = {
        position: "relative",
    }

    const selectStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.5rem 0.75rem",
        paddingRight: "2rem",
        border: `1px solid ${error ? "red" : "#dee2e6"}`,
        borderRadius: "0.5rem",
        fontSize: "1rem",
        appearance: "none",
    }

    const errorStyle: React.CSSProperties = {
        marginTop: "0.25rem",
        fontSize: "0.875rem",
        color: "red",
    }

    const getRenderColor = (error?: boolean) => {
        if (error) {
            return "red";
        }

        return "#dee2e6";
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return (
        <div style={wrapperStyle} className={className}>
            {label && (
                <label htmlFor={selectId} style={labelStyle}>
                    {label}
                </label>
            )}
            <div style={selectWrapperStyle}>
                <select
                    id={selectId}
                    style={selectStyle}
                    onChange={handleChange}
                    {...props}
                    onFocus={(e) => {
                        e.currentTarget.style.outline = "none"
                        e.currentTarget.style.borderColor = "#5e3bee"
                        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(94, 59, 238, 0.2)"
                        if (props.onFocus) props.onFocus(e)
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none"
                        e.currentTarget.style.borderColor = getRenderColor(error)
                        if (props.onBlur) props.onBlur(e)
                    }}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "0.75rem",
                        transform: "translateY(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid #6c757d",
                        pointerEvents: "none",
                    }}
                ></div>
            </div>
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    )
}

export default Select

