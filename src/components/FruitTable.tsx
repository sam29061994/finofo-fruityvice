import { Fruit } from "./FruitList";
import { Button } from "./ui/button"; // Shadcn button component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // Shadcn table components

// Define the type for the fruit data

type TableViewProps = {
  data: Fruit[]; // Array of fruits to display
  onAdd: (id: number) => void; // Callback when the add button is clicked
};

const FruitTable = ({ data, onAdd }: TableViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Family</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Genus</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((fruit) => (
          <TableRow key={fruit.name}>
            <TableCell>{fruit.name}</TableCell>
            <TableCell>{fruit.family}</TableCell>
            <TableCell>{fruit.order}</TableCell>
            <TableCell>{fruit.genus}</TableCell>
            <TableCell>{fruit.nutritions.calories}</TableCell>
            <TableCell>
              <Button onClick={() => onAdd(fruit.id)}>Add</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FruitTable;
