import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useFruits } from "@/services/fruityVice";
import SkeletonLoader from "@/components/Skeleton";
import CustomSelect from "@/components/CustomSelect";
import { useMemo, useState } from "react";
import { groupBy } from "@/utils";
import { Fruit } from "@/components/FruitList/types";
import FruitList from "@/components/FruitList/FruitList";
import GroupByFruitList from "@/components/FruitList/GroupByFruitList";
import FruitTable from "@/components/FruitList/FruitTable";
import FruitPieChart from "@/components/FruitList/FruitPieChart";

export type ViewValue = "list" | "table";
export type GroupByValue = "family" | "order" | "genus" | "none";

const Home = () => {
  const { isLoading, data, error } = useFruits();
  const [selectedValue, setSelectedValue] = useState<ViewValue>("list");
  const [groupByValue, setGroupByValue] = useState<GroupByValue>("none");
  const { toast } = useToast();
  const [fruitJar, setFruitJar] = useState<Fruit[]>([]);

  const groupedFruits = groupBy(data, groupByValue);

  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem fetching the fruits.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }

  const addFruitTOJar = (id: number) => {
    const fruit = data.find((fruit) => fruit.id === id);
    if (fruit) {
      setFruitJar((prev) => [...prev, fruit]);
      toast({
        variant: "default",
        title: "Added to Jar",
        description: `${fruit.name} has been added to your jar.`,
      });
    }
  };

  const totalCalories = useMemo(() => {
    return fruitJar.reduce(
      (total, fruit) => total + fruit.nutritions.calories,
      0
    );
  }, [fruitJar]);

  return (
    <div className="container mx-auto p-4 flex justify-center  bg-background overflow-x-hidden md:overflow-x-auto">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-[70%] p-4 ">
          <h2 className="text-xl font-semibold text-center mr-8 mb-8">
            Fruits List
          </h2>
          <div className="flex items-center mb-8">
            <label className="block text-sm font-medium mr-4">View</label>
            <CustomSelect
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
              placeholder="Select View"
              label="View"
              options={[
                { value: "list", label: "List" },
                { value: "table", label: "Table" },
              ]}
            />
            <label className="block text-sm font-medium mx-4">Group By</label>
            <CustomSelect
              value={groupByValue}
              onValueChange={(value) => setGroupByValue(value)}
              disabled={selectedValue === "table"}
              placeholder="Group By"
              label="Group By"
              options={[
                { value: "none", label: "None" },
                { value: "family", label: "Family" },
                { value: "order", label: "Order" },
                { value: "genus", label: "Genus" },
              ]}
            />
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : selectedValue === "list" ? (
            groupByValue === "none" ? (
              <FruitList fruits={data} onAdd={addFruitTOJar} />
            ) : (
              <GroupByFruitList
                groupedFruits={groupedFruits}
                onAdd={addFruitTOJar}
              />
            )
          ) : (
            <FruitTable data={data} onAdd={addFruitTOJar} />
          )}
        </div>
        <div className="w-full md:w-[30%] p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Fruit Jar
          </h2>
          <FruitPieChart data={fruitJar} />
          <FruitList fruits={fruitJar} />
          <div className="text-center mt-4">
            <p className="text-lg font-semibold text-left ">
              Total Calories: {totalCalories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
