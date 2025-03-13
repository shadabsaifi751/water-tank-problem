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

  let bestSolutions = [];
  let maxProfit = 0;

  function exploreCombinations(remainingTime, currentProfit, builtProperties) {
    if (currentProfit > maxProfit) {
      bestSolutions = [{ ...builtProperties }];
      maxProfit = currentProfit;
    } else if (currentProfit === maxProfit) {
      bestSolutions.push({ ...builtProperties });
    }

    for (const property of properties) {
      if (remainingTime > property.buildTime) { // Changed condition here
        const operationalTime = remainingTime - property.buildTime;
        const additionalProfit = operationalTime * property.earnings;
        const newProperties = { ...builtProperties };
        newProperties[property.code]++;
        exploreCombinations(
          operationalTime,
          currentProfit + additionalProfit,
          newProperties
        );
      }
    }
  }

  exploreCombinations(timeUnit, 0, { T: 0, P: 0, C: 0 });

  return {
    profit: maxProfit,
    solutions: bestSolutions
  };
}

// Format and solve test cases as before
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

// Test cases
solveTestCase(7); 
solveTestCase(8);
solveTestCase(13);
solveTestCase(49);



// output

// For input 49
// maxEarnings: 324000,
// 2 possibilities:
// T: 9, P: 0, C:0
// T: 8, P: 2, C: 0

// Test Case 1
// Time Unit: 7
// Earnings: $3000
// Solutions
// 1. T: 1 P: 0 C: 0
// 2. T: 0 P: 1 C: 0

// Test Case 2
// Time Unit: 8
// Earnings: $4500
// Solutions
// 1. T: 1 P: 0 C: 0

// Test Case 3
// Time Unit: 13
// Earnings: $16500
// Solutions
// 1. T: 2 P: 0 C: 0
