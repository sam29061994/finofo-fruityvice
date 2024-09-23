interface Fruit {
  id: number;
  name: string;
  family: string;
  order: string;
  genus: string;
  calories: number;
}

interface FruitListProps {
  fruits: Fruit[];
}

const FruitList = ({ fruits }: FruitListProps) => {
  return (
    <div>
      <h1>Fruit List</h1>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FruitList;
