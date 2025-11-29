/* 
1. What is the difference between forEach and for...of? When would you use each? (0.5 Grade)

forEach:
   Works only with arrays.
   Cannot use break or continue.
   Runs a function for each element in the array.

forof:
   Works with arrays, strings, sets, maps.
   Can use break and continue.
   More flexible if you want to stop or skip elements.

When to use:

forEach ==> If you want to do something for every element 
for of  ==> If you need control during the loop 



2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples. (0.5 Grade)

Hoisting: JavaScript moves variable and function declarations to the top of their scope before execution.

   console.log(a); // undefined
   var a = 5;

TDZ (Temporal Dead Zone): The time before a let or const variable is declared, where it cannot be used.

   console.log(b); // Error
   let b = 10;

-

3. What are the main differences between == and ===? (0.5 Grade)

== -> checks value only, types can be different.
=== -> checks value and type, both must match.


4. Explain how try-catch works and why it is important in async operations. (0.5 Grade)

try-catch stops the program from crashing when there is an error.
It is useful in async code like fetching data.


5. What’s the difference between type conversion and coercion? Provide examples of each. (0.5 Grade)

Conversion: you change type yourself
    Number("5"); // 5
    String(10);  // "10"

Coercion: JavaScript changes type automatically
    "5" + 1; // "51" → number 1 converted to string
    "10" - 2; // 8 → string "10" converted to number
*/