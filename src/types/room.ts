export const CATEGORIES = {
  SCIENCE: {
    name: "SCIENCE" as const,
    subCategories: ["PHYSICS", "CHEMISTRY", "BIOLOGY"] as const
  },
  HISTORY: {
    name: "HISTORY" as const,
    subCategories: ["WORLD_HISTORY", "KOREAN_HISTORY"] as const
  },
  LANGUAGE: {
    name: "LANGUAGE" as const, 
    subCategories: ["KOREAN", "ENGLISH"] as const
  },
  GENERAL_KNOWLEDGE: {
    name: "GENERAL_KNOWLEDGE" as const,
    subCategories: ["CURRENT_AFFAIRS", "CULTURE", "SPORTS"] as const
  }
} as const;

export type MainCategory = typeof CATEGORIES[keyof typeof CATEGORIES]["name"];
export type SubCategory = typeof CATEGORIES[keyof typeof CATEGORIES]["subCategories"][number];

export type Difficulty = "EASY" | "NORMAL" | "HARD";

export type AnswerType = "MULTIPLE_CHOICE" | "TRUE_FALSE";