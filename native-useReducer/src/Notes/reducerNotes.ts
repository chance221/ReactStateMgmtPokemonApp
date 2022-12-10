const numbers = [10,20,30];

let total = 0;

for(const n of numbers){
  total += n;
}

total;

//The reducer takes two values. The first is the callback function
//this callback will take in the current value, and the next expression
//in this cast the current value would be the first number in the numbers array
//the second value is the next number in the array. 
//That call back functio then needs to "reduce" or perform an action on the current
//value. We don't need to add them. We can do whatever we want with them

//After the callback we take in the initial value we are doing the operation on
//in this case we are just adding each aray to the initial value of 30.

//The output is what the next iteration will be. so 30 is added to 10 which becomes 40, then 60 then 90

//This is important to understanding redux and how reducers work
total = numbers.reduce( (cv, n) => cv+n, 30);

total;
