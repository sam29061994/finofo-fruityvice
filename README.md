# Fruit Jar Demo App

This is a demo application built as a take-home assignment. The application allows users to view a list of fruits, group them by various attributes, and add them to a "fruit jar" while keeping track of the total calories.

## Features

- **View Fruits**: Display a list of fruits with their details.
- **Group Fruits**: Group fruits by family, order, or genus.
- **Add to Fruit Jar**: Add selected fruits to a fruit jar.
- **Total Calories**: Calculate and display the total calories of the fruits in the jar.
- **Error Handling**: Display error messages using a toast component.
- **Event Broadcasting**: Broadcast events when fruits are added to the jar using a toast component.

## Thought Patterns and Application Design

### Component Structure

1. **Home Component**: The main component that manages the state and renders other components.
2. **FruitList Component**: Displays a list of fruits.
3. **GroupByFruitList Component**: Displays fruits grouped by a selected attribute.
4. **FruitTable Component**: Displays fruits in a table format.
5. **SkeletonLoader Component**: Displays a loading skeleton while data is being fetched.
6. **Toast Component**: Displays error messages and broadcasts events.

### State Management

- **selectedValue**: Manages the view type (list or table).
- **groupByValue**: Manages the attribute by which fruits are grouped.
- **fruitJar**: Manages the list of fruits added to the jar.

### Memoization

- **groupedFruits**: Memoized to avoid recalculating the grouped fruits when the data or groupByValue changes.
- **totalCalories**: Memoized to avoid recalculating the total calories when the fruitJar changes.

### Conditional Rendering

- **SkeletonLoader**: Displayed while data is being fetched.
- **FruitList**: Displayed when the view type is "list" and no grouping is selected.
- **GroupByFruitList**: Displayed when the view type is "list" and a grouping attribute is selected.
- **FruitTable**: Displayed when the view type is "table".

### Error Handling and Event Broadcasting

- **Toast Component**: Used to display error messages and broadcast events when fruits are added to the jar. This enhances the user experience by providing immediate feedback.

### Deployment

The application is deployed on Vercel and uses serverless functions to fetch the API. You can access the live application at [https://finofo-fruityvice.vercel.app/](https://finofo-fruityvice.vercel.app/).

## Code Snippets

### Home Component

```tsx
import React, { useState, useMemo } from "react";
import { groupBy } from "lodash";
import FruitList from "./FruitList";
import GroupByFruitList from "./GroupByFruitList";
import FruitTable from "./FruitTable";
import SkeletonLoader from "./SkeletonLoader";
import Toast from "./Toast"; // Import Toast component

const Home = ({ data, isLoading, addFruitTOJar, fruitJar }) => {
  const [selectedValue, setSelectedValue] = useState("list");
  const [groupByValue, setGroupByValue] = useState("none");

  const groupedFruits = useMemo(
    () => groupBy(data, groupByValue),
    [data, groupByValue]
  );

  const totalCalories = useMemo(() => {
    return fruitJar.reduce(
      (total, fruit) => total + fruit.nutritions.calories,
      0
    );
  }, [fruitJar]);

  const handleAddFruit = (fruit) => {
    try {
      addFruitTOJar(fruit);
      Toast.success(`${fruit.name} added to the jar!`);
    } catch (error) {
      Toast.error("Failed to add fruit to the jar.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="w-2/3 p-4">
          <div className="mb-4">
            <Select
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
              <FruitList fruits={data} onAdd={handleAddFruit} />
            ) : (
              <GroupByFruitList
                groupedFruits={groupedFruits}
                onAdd={handleAddFruit}
              />
            )
          ) : (
            <FruitTable data={data} onAdd={handleAddFruit} />
          )}
        </div>
        <div className="w-1/3 p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Fruit Jar
          </h2>
          <FruitList fruits={fruitJar} />
          <div className="text-center mt-4">
            <p className="text-lg font-semibold">
              Total Calories: {totalCalories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
```
