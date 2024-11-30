export interface Recipe {
  id: number;
  title: string;
  description: string;
  cookingTime: string;
  difficulty: "쉬움" | "보통" | "어려움";
  recipe: string;
  ingredients: string[];
}
