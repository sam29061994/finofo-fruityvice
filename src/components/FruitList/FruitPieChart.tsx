import { useMemo } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Fruit } from "./types";

type FruitPieChartProps = {
  data: Fruit[];
};

const generateColor = (index: number) => {
  const hue = (index * 137.5) % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const FruitPieChart = ({ data }: FruitPieChartProps) => {
  const chartData = useMemo(() => {
    return data.map((fruit, index) => ({
      name: fruit.name,
      calories: fruit.nutritions.calories,
      fill: generateColor(index),
    }));
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          className="mx-auto aspect-square min-h-[450px]"
          config={{}}
        >
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              dataKey="calories"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              labelLine={false}
              label={({ name }) => `${name}`}
            />
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default FruitPieChart;
