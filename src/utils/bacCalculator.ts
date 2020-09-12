import { drinkType } from "../types";
import { drinkSorter } from "./drinkSorter";

export const bacCalculator = ({
  widmarkFactor,
  absorptionRate,
  eliminationRate,
  weight,
  drinks,
}: {
  widmarkFactor: number;
  absorptionRate: number;
  eliminationRate: number;
  weight: number;
  drinks: drinkType[];
}) => {
  // --- creates a new array where the drinks are in chronological order --- //
  const descendingDrinks = drinkSorter(drinks, false);

  // --- calculates current Blood alcohol level --- //
  let currentBAC = drinks.reduce(
    (acc: number, curDrink: drinkType, i: number) => {
      let alcoholMass: number = 0; // Mass of alcohol in the current drink
      if (curDrink.unit === "ml") {
        alcoholMass =
          parseFloat(curDrink.volume) *
          0.0007893 *
          (parseFloat(curDrink.ABV) / 100);
      }

      let x =
        alcoholMass *
        (1 - Math.E ** (-absorptionRate * parseFloat(curDrink.timePassed)));
      let y = widmarkFactor * weight;

      const curDrinkBac = (x / y) * 100;
      let curBac = 0;
      if (i === descendingDrinks.length - 1) {
        curBac =
          acc + curDrinkBac - parseFloat(curDrink.timePassed) * eliminationRate;
      } else {
        curBac =
          acc +
          curDrinkBac -
          (parseFloat(curDrink.timePassed) -
            parseFloat(descendingDrinks[i + 1].timePassed)) *
            eliminationRate;
      }

      console.log(`--------[DRINK NUMBER: ${i + 1}]--------`);
      console.log(`Type: ${curDrink.type}`);
      console.log(`BAC before: ${acc.toFixed(4)}`);
      console.log(`BAC after: ${curBac.toFixed(4)}`);
      console.log(`---------------------------------`);

      return curBac;
    },
    0
  );
  return currentBAC < 0 ? 0 : currentBAC;
};