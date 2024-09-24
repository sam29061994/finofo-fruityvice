# Fruit Jar Demo App

This is a demo application built as a take-home assignment. The application allows users to view a list of fruits, group them by various attributes, and add them to a "fruit jar" while keeping track of the total calories.

## Features

- **View Fruits**: Display a list of fruits with their details.
- **Group Fruits**: Group fruits by family, order, or genus.
- **Add to Fruit Jar**: Add selected fruits to a fruit jar.
- **Total Calories**: Calculate and display the total calories of the fruits in the jar.
- **Pie Chart**: Visualize the distribution of fruits in the jar using a pie chart.
- **Error Handling**: Display error messages using a toast component.
- **Event Broadcasting**: Broadcast events when fruits are added to the jar using a toast component.

## Thought Patterns and Application Design

### Component Structure

1. **Home Component**: The main component that manages the state and renders other components.
2. **FruitList Component**: Displays a list of fruits.
3. **GroupByFruitList Component**: Displays fruits grouped by a selected attribute.
4. **FruitTable Component**: Displays fruits in a table format.
5. **SkeletonLoader Component**: Displays a loading skeleton while data is being fetched.
6. **FruitPieChart Component**: Displays a pie chart of the fruits in the jar.
7. **Toast Component**: Displays error messages and broadcasts events.

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

### Data Fetching with SWR

The application uses SWR (stale-while-revalidate) for data fetching. SWR is a React Hooks library for remote data fetching that provides features like caching, revalidation, focus tracking, and more. The `useFruits` hook utilizes SWR to fetch the list of fruits from a serverless function.

#### Example of `useFruits` Hook

```typescript
import { Fruit } from "@/components/FruitList/types";
import useSWR from "swr";

const API_URL = "api/fruits";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFruits = () => {
  const { data, error, isLoading } = useSWR<Fruit[]>(API_URL, fetcher);
  return { data: data || [], error, isLoading };
};
```

## Deployment

The application is deployed on Vercel and uses serverless functions to fetch the API. You can access the live application at https://finofo-fruityvice.vercel.app/.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sam29061994/finofo-fruityvice.git
    ```

2. Navigate to the project directory:
    ```bash
    cd fruit-jar-demo
    ```

3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1. Start the application:
    ```bash
    npm start
    # or
    yarn start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

