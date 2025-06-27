'use strict'

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function findPrimes() {
  const max = parseInt(document.getElementById('maxNumber').value, 10);
  const primes = [];

  for (let i = 2; i <= max; i++) {
    if (isPrime(i)) primes.push(i);
  }

  document.getElementById('result').textContent =
    `素数: ${primes.join(', ')}`;
}