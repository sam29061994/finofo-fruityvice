import { useMemo } from "react";
import { PieChart, Pie } from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Fruit } from "./types";

interface FruitPieChartProps {
  data: Fruit[];
}

const generateColor = (index: number) => {
  const hue = (index * 137.5) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const FruitPieChart = ({ data }: FruitPieChartProps) => {
  const chartData = useMemo(() => {
    const fruitMap = new Map();

    data.forEach((fruit, index) => {
      if (fruitMap.has(fruit.name)) {
        fruitMap.get(fruit.name).calories += fruit.nutritions.calories;
      } else {
        fruitMap.set(fruit.name, {
          name: fruit.name,
          calories: fruit.nutritions.calories,
          fill: generateColor(index),
        });
      }
    });

    return Array.from(fruitMap.values());
  }, [data]);

  return (
    <div className="flex flex-col w-full ">
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          className="mx-auto aspect-square min-h-[400px]"
          config={{}}
        >
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="calories"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              labelLine={false}
              label={({ name, calories }) => `${name} | ${calories} cal`}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default FruitPieChart;
