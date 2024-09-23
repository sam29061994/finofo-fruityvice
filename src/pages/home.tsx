import FruitList from "@/components/fruitList";
import Jar from "@/components/jar";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useFruits } from "@/services/fruityVice";

const Home = () => {
  const { isLoading, data, error } = useFruits();
  const { toast } = useToast();
  console.log(data);

  if (isLoading) return <Skeleton className="h-12 w-12 rounded-full" />;

  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem fetching the fruits.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl bg-background">
      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Fruits List
          </h2>
          <FruitList fruits={data} />
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Fruit Jar
          </h2>
          <Jar />
        </div>
      </div>
    </div>
  );
};

export default Home;
