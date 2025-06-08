// Booleans
const falseBoolean = false;
const oppositeOfFalseBoolean = !falseBoolean;
const numberBoolean = 1;
const stringBoolean = "";
const undefinedBoolean = undefined;
const nullBoolean = null;

// Numbers
const numberOne = 123;
const decimalNumber = 10.5;

// Strings
const regularString = "Hallo";
const templateString = `Hallo, ${numberOne}`;

// Arrays
const numberArray = [1, 2, 3, 4, 5, 6, 7];
const arraySize = numberArray.length;
const endIndex = arraySize - 1;
// console.log(arraySize);

let sum = 0;

numberArray.forEach((item, index) => {
  const rest = index % 2;
  const isEvenNumber = rest === 0;

  if (isEvenNumber) {
    sum = sum + item;
  } else {
    sum = sum - item;
  }
});
// console.log(sum);

const result2 = numberArray[0] + numberArray[endIndex];
// console.log(result2);

const stringArray = ["a", "b", "c", "d"];
stringArray.forEach((item, index) => {
  if (item === "c") {
    // console.log("i dont like c");
  } else {
    // console.log(item, index);
  }
});

// Objects

const object = {
  a: 1,
  b: ["Hallo", "Good Bye"],
  c: stringArray,
  d: {
    x: "inside object d",
  },
};

const toDoItem = {
  text: "Hier ist der Text",
  done: false,
};

// console.log(object.d.x);
