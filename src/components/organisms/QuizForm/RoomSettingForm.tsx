"use client"

import type React from "react"
import { useState } from "react"
import Card from "../../atoms/Card/Card"
import Input from "../../atoms/Input/Input"
import Select from "../../atoms/Select/Select"
import Button from "../../atoms/Button/Button"
// Remove the SCSS import and use inline styles instead
// import './QuizForm.scss';

export interface QuizFormProps {
  onSubmit?: (formData: QuizFormData) => void
  onCancel?: () => void
}

export interface QuizFormData {
  category: string
  questionCount: string
  timeLimit: string
  playerLimit: string
  difficulty: string
  password?: string
}

const RoomSettingForm: React.FC<QuizFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<QuizFormData>({
    category: "상식 퀴즈",
    questionCount: "10",
    timeLimit: "15",
    playerLimit: "8",
    difficulty: "어려움",
    password: "",
  })

  const handleChange = (field: keyof QuizFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  // Inline styles to replace the SCSS
  const formActionsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginTop: "2rem",
  }

  return (
    <Card className="quiz-form" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <Select
          label="주제"
          options={[
            { value: "상식 퀴즈", label: "상식 퀴즈" },
            { value: "역사 퀴즈", label: "역사 퀴즈" },
            { value: "과학 퀴즈", label: "과학 퀴즈" },
            { value: "영화 퀴즈", label: "영화 퀴즈" },
          ]}
          value={formData.category}
          onChange={(value) => handleChange("category", value)}
        />

        <Select
          label="질문 수"
          options={[
            { value: "5", label: "5 개" },
            { value: "10", label: "10 개" },
            { value: "15", label: "15 개" },
            { value: "20", label: "20 개" },
          ]}
          value={formData.questionCount}
          onChange={(value) => handleChange("questionCount", value)}
        />

        <Select
          label="제한 시간"
          options={[
            { value: "10", label: "10 초" },
            { value: "15", label: "15 초" },
            { value: "20", label: "20 초" },
            { value: "30", label: "30 초" },
          ]}
          value={formData.timeLimit}
          onChange={(value) => handleChange("timeLimit", value)}
        />

        <Select
          label="인원 수"
          options={[
            { value: "4", label: "4명" },
            { value: "6", label: "6명" },
            { value: "8", label: "8명" },
            { value: "10", label: "10명" },
          ]}
          value={formData.playerLimit}
          onChange={(value) => handleChange("playerLimit", value)}
        />

        <Select
          label="난이도"
          options={[
            { value: "쉬움", label: "쉬움" },
            { value: "보통", label: "보통" },
            { value: "어려움", label: "어려움" },
          ]}
          value={formData.difficulty}
          onChange={(value) => handleChange("difficulty", value)}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요 (선택사항)"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <div style={formActionsStyle}>
          <Button type="submit" fullWidth>
            방 만들기
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" fullWidth onClick={onCancel}>
              취소
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}

export default RoomSettingForm

