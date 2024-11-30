"use client";

import { recipes } from "./data/recipes";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { Recipe } from "./types/recipe";

export default function Home() {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("전체");

  const handleSearch = (query: string) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredRecipes(filtered);
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === "전체") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.difficulty === difficulty)
      );
    }
  };

  const difficultyColors = {
    쉬움: "bg-green-100 text-green-800",
    보통: "bg-yellow-100 text-yellow-800",
    어려움: "bg-red-100 text-red-800",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            맛있는 레시피
          </h1>
          <p className="text-gray-600">집에서 만드는 맛있는 요리 레시피 모음</p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />

          <div className="flex gap-2 mt-4 justify-center">
            {["전체", "쉬움", "보통", "어려움"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyFilter(difficulty)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Link
              href={`/${recipe.id}`}
              key={recipe.id}
              className="transform hover:scale-105 transition-all duration-200"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {recipe.title}
                  </h2>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      difficultyColors[
                        recipe.difficulty as keyof typeof difficultyColors
                      ]
                    }`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 h-12 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {recipe.cookingTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-gray-700">재료:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                      <li key={index} className="text-sm">
                        {ingredient}
                      </li>
                    ))}
                    {recipe.ingredients.length > 4 && (
                      <li className="text-sm text-blue-500 font-medium">
                        +{recipe.ingredients.length - 4}개 더보기
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}
