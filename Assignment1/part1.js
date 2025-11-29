/*1. Convert the string "123" to a number and add 7. (0.5 Grade)
• Output Example: 130*/
console.log(Number("123") + 7);

/*2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
• Input Example: 0
• Output Example: "Invalid"*/
function checkFalsy(value) {
  if (!value) {
    return "Invalid";
  }
  return "Valid";
}
console.log(checkFalsy(0));

/*3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
• Output Example:1, 3, 5, 7, 9*/
for (let i = 1; i <= 10; i++) {
  if (i % 2 == 0) {
    continue;
  }
  console.log(i);
}

/*4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
• Input Example: [1, 2, 3, 4, 5]
• Output Example: [2,4]*/
let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter((n) => n % 2 == 0);

console.log(evenNumbers);

/*5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
• Input Example: [1, 2, 3], [4, 5, 6]
• Output Example: [1, 2, 3, 4, 5, 6]*/
let array1 = [1, 2, 3],
  array2 = [4, 5, 6];

console.log(array1.concat(array2));

/*6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)
• Input Example: 2
• Output Example: “Monday”*/
function getDay(num) {
  switch (num) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return "Invalid Day";
  }
}
console.log(getDay(2));

/*7. Create an array of strings and return their lengths using map method (0.5 Grade)
• Input: ["a", "ab", "abc"]
• Output Example: [1, 2, 3]*/
let strings = ["a", "ab", "abc"];
let lengths = strings.map(function (strings) {
  return strings.length;
});
console.log(lengths);

/*8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
• Input Example: 15
• Output Example: “Divisible by both”*/
function divisible(n) {
  if (n % 3 == 0 && n % 5 == 0) {
    console.log("Divisible by both");
  } else {
    console.log("Not disvisable");
  }
}
divisible(15);


/*9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
• Input Example: 5
• Output Example: 25*/
let square = (num) => {
    return num * num;
};

console.log(square(5));


/*10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
• Input Example: const person = {name: 'John', age: 25}
• Output Example: 'John is 25 years old'*/
function info(person){
    console.log(person.name + " is " + person.age + " years old");
}
let person1 = {name: "John" , age: 25}
info(person1);
// let person2 = {name: "omnia" , age: 21}
// info(person2)


/*11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
• Input Example: 1, 2, 3, 4, 5
• Output Example: 15*/
function sum(...nums){
    let sum = 0;
    for(let num of nums){
        sum += num;
    }
    return sum;
}

console.log(sum(1, 2, 3, 4, 5));


/*12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
• Output Example: “Success”*/
// function delayed(){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             resolve("Success");
//         },3000);
//     });
// }
// delayed().then(function(msg){
//     console.log(msg);
// });


/*13. Write a function to find the largest number in an array. (0.5 Grade)
• Input Example: [1, 3, 7, 2, 4]
• Output Example: 7*/
function largestNumber(arr){
    let largest = arr[0];
    for(let i = 1; i <= arr.length-1; i++){
        if (arr[i] > largest){
            largest = arr[i];
        }
    }
    return largest;
}

numbers = [1, 3, 7, 2, 4]
console.log(largestNumber(numbers));


/*14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
• Input Example: name: "John", age: 30}
• Output Example: ["name", "age"]*/
function getKeys(object){
    let keysArray = [];
    for(let key in object){
        keysArray.push(key);
    }
    return keysArray;
}

let person = { name: "John", age: 30 };
console.log(getKeys(person))


/*15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
• Input: "The quick brown fox"
• Output: ["The", "quick", "brown", "fox"]*/
function splitString(str){
    return str.split(" ");
}

let Input = "The quick brown fox";
console.log(splitString(Input));

