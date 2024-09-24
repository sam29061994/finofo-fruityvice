import { Button } from "../ui/button";
import { Fruit, OnAdd } from "./types";

interface FruitListProps {
  fruits: Fruit[];
  onAdd?: OnAdd;
}

const FruitList = ({ fruits, onAdd }: FruitListProps) => {
  return (
    <div className="max-w-lg  shadow-md rounded-lg">
      <ul className="divide-y divide-gray-700">
        {fruits.map((fruit) => (
          <li key={fruit.id} className="flex justify-between items-center py-4">
            <div>
              <span className="font-medium text-lg text-gray-200">
                {fruit.name}
              </span>{" "}
              <span className="text-gray-400">
                | {fruit.nutritions.calories} calories
              </span>
            </div>
            {onAdd && (
              <Button
                onClick={() => onAdd(fruit.id)}
                className="px-4 py-2 rounded"
                variant="outline"
              >
                Add to Jar
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FruitList;
