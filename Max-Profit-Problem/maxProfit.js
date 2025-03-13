function calculateMaxProfit(timeUnit) {
  // Property definitions
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

  // This will store our best solution
  let bestSolution = {
    profit: 0,
    properties: { T: 0, P: 0, C: 0 },
  };

  function exploreCombinations(remainingTime, currentProfit, builtProperties) {
    // Check if current solution is better than best found so far
    if (currentProfit > bestSolution.profit) {
      bestSolution = {
        profit: currentProfit,
        properties: { ...builtProperties },
      };
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

  return bestSolution;
}

function formatSolution(solution) {
  return `Earnings: $${solution.profit}\nSolutions\n1. T: ${solution.properties.T} P: ${solution.properties.P} C: ${solution.properties.C}`;
}

function solveTestCase(timeUnit) {
  console.log(`Test Case\nTime Unit: ${timeUnit}`);
  const solution = calculateMaxProfit(timeUnit);
  console.log(formatSolution(solution));
}

// Solve the test cases provided in the problem
// solveTestCase(7); // Test Case 1
// solveTestCase(8); // Test Case 2
solveTestCase(7); // Test Case 3

// Let's also try some additional test cases
// solveTestCase(20);
// solveTestCase(30);
// solveTestCase(50);
