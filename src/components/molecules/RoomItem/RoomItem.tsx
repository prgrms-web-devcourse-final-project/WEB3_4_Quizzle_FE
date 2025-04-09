"use client"

import type React from "react"
import Button from "../../atoms/Button/Button"
// Remove SCSS import
// import './RoomItem.scss';

export interface QuizItemProps {
  title: string;
  maxMember: number;
  member: number;
  onStart?: () => void;
}

const RoomItem: React.FC<QuizItemProps> = ({ title, maxMember, member, onStart }: QuizItemProps) => {
  const roomItemStyle = {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    padding: "1rem",
    borderBottom: "1px solid #dee2e6",
  }

  const contentStyle = {
    display: "flex",
    flexDirection: "row" as const,
    flex: 1,
    gap: 10
  }

  const titleStyle = {
    marginBottom: "0.25rem",
    fontSize: "1.25rem",
  }

  const actionsStyle = {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "flex-end" as const,
    alignItems: "center" as const,
    gap: "0.75rem",
  }

  const scoreStyle = {
    fontWeight: 500,
    color: "#495057",
  }

  return (
    <div style={roomItemStyle}>
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
      </div>
      <div style={actionsStyle}>
        {<div style={scoreStyle}>{`${member} / ${maxMember}`}</div>}
        <Button onClick={onStart}>참가</Button>
      </div>
    </div>
  )
}

export default RoomItem

