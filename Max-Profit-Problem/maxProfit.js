function calculateMaxProfit(timeUnit) {
  
  const properties = [
    { name: "Theatre", buildTime: 5, earnings: 1500, land: "2x1", code: "T" },
    { name: "Pub", buildTime: 4, earnings: 1000, land: "1x1", code: "P" },
    {
      name: "Commercial Park",
      buildTime: 10,
      earnings: 3000,
      land: "3x1",
      code: "C",
    },
  ];

  // This will store all optimal solutions
  let bestSolutions = [];
  let maxProfit = 0;

  function exploreCombinations(remainingTime, currentProfit, builtProperties) {
    // Check if current solution is better than best found so far
    if (currentProfit > maxProfit) {
      // Clear previous solutions as we found a better profit
      bestSolutions = [{ ...builtProperties }];
      maxProfit = currentProfit;
    } else if (currentProfit === maxProfit) {
      // Add this solution to our collection of best solutions
      bestSolutions.push({ ...builtProperties });
    }

    // Try building each type of property
    for (const property of properties) {
      // If we have enough time to build this property
      if (remainingTime >= property.buildTime) {
        // Calculate operational time and profit from this property
        const operationalTime = remainingTime - property.buildTime;
        const additionalProfit = operationalTime * property.earnings;

        // Create new property count with this property added
        const newProperties = { ...builtProperties };
        newProperties[property.code]++;

        // Recursively explore this path
        exploreCombinations(
          operationalTime,
          currentProfit + additionalProfit,
          newProperties
        );
      }
    }
  }

  // Start exploration with all time units available and no properties built
  exploreCombinations(timeUnit, 0, { T: 0, P: 0, C: 0 });

  return {
    profit: maxProfit,
    solutions: bestSolutions
  };
}

function formatSolution(result) {
  let output = `Earnings: $${result.profit}\nSolutions`;
  
  result.solutions.forEach((solution, index) => {
    output += `\n${index + 1}. T: ${solution.T} P: ${solution.P} C: ${solution.C}`;
  });
  
  return output;
}

function solveTestCase(timeUnit) {
  console.log(`Test Case\nTime Unit: ${timeUnit}`);
  const result = calculateMaxProfit(timeUnit);
  console.log(formatSolution(result));
}

// Solve the test cases provided in the problem
solveTestCase(7); 
solveTestCase(8); 
solveTestCase(49); 
solveTestCase(13); 
