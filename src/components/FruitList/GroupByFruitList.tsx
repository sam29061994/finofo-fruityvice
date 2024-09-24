import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Fruit, OnAdd } from "./types";

interface GroupByFruitListProps {
  groupedFruits: Record<string, Fruit[]>;
  onAdd: OnAdd;
}

const GroupByFruitList = ({ groupedFruits, onAdd }: GroupByFruitListProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(groupedFruits).map(([key, fruits]) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger>{key}</AccordionTrigger>
          <AccordionContent>
            <ul className="divide-y divide-gray-700">
              {fruits.map((fruit) => (
                <li
                  key={fruit.id}
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <span className="font-medium text-lg text-gray-200">
                      {fruit.name}
                    </span>{" "}
                    <span className="text-gray-400">
                      | {fruit.nutritions.calories} calories
                    </span>
                  </div>
                  <Button
                    onClick={() => onAdd(fruit.id)}
                    className="px-4 py-2 rounded"
                    variant="outline"
                  >
                    Add to Jar
                  </Button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default GroupByFruitList;
