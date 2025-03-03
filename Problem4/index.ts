// Iterative Approach
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Mathematical Formula
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Recursive Approach
function sum_to_n_c(n: number): number {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
}

const NUMBER = 5;

console.log("Iterative Approach: ", sum_to_n_a(NUMBER))
console.log("Mathematical Formula: ", sum_to_n_b(NUMBER))
console.log("Recursive Approach: ", sum_to_n_c(NUMBER))
