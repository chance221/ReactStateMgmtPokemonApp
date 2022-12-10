import { useState, useMemo } from "react";

/*
When to use useMemo:
1) When it is an expensive calculatoin that only absolutely needs to run when the component is rendered
2) When its return a non-scalar value (objects or arrays) and not a scalar (string)

Lets say we have a component that return a total from an array.

 
If we don't want that total computed every time the cmomponent renders we can 
use useMemo

useMemo takes a function that does the calculation
*/
function App2() {
  const [numbers, setNumbers] = useState([10, 20, 30]);
  //This total will be calculated every time
  const total = numbers.reduce((acc, number) => acc + number, 0);

  //This total will be calculated once when the component renders and only if the numbers
  //state changes

  //Any type of complex calculation hsoud be made using useMemo so the calculation
  //runs only when absolutely needed. 

  //useMemo takes in the calulating function and an array of states you want calculated 
  //only when those particular states update and not when the component re-renders.
  const total2 = useMemo(
    () => numbers.reduce( (acc, number) => acc + number, 0), 
    [numbers]
  );   
  

  const [names, setNames] = useState(["Ringo", "John", "Paul", "George"]);

  //We NEVER want to mutate an array but create a copy of it and perform the operation
  //so this const sortedNames = names.sort() won't update the state but the below will
  //But now wvery time the componsnet re-renders we have a problem with sorting the list
  const sortedNames = [...names].sort();

  //We want to sort thelist only once and then only resort when the names state is pdated
  const sortedNames2 = useMemo ( () => [...names].sort(), 
    [name]
  )

  return (
    <>
      <div>
        Numbers Example:
        <div>
          Total: {total}      
        </div>

        <div>
          Same total: {total2}
        </div>
      </div>

      <br/>
      <div>
        String Example
        <div>
          Names: {names.join(", ")}      
        </div>

        <div>
          Sorted Names: {sortedNames.join(", ")}
        </div>

        <div>
          Same List of Sorted Names: {sortedNames2.join(", ")}
        </div>


      </div>
    </>
    
  );
}

export default App2;