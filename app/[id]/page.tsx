import { recipes } from "../data/recipes";
import Link from "next/link";

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = recipes.find((r) => r.id === parseInt(params.id));

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        ← 목록으로
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>

        <div className="flex gap-4 mb-8">
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            ⏱ {recipe.cookingTime}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            난이도: {recipe.difficulty}
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">재료</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">조리 방법</h2>
          <div className="space-y-4 text-gray-700">
            {recipe.recipe.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
