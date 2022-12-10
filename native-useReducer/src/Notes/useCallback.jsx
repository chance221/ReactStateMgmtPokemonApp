import {useState, useMemo, useCallback} from 'react';

/* 
There will be a time oyu want to store the reference to a a function and have 
react recognize that as the same function every time. This is where useCallback 
comes into play. Lets say we want to sot a list only once but we also want to use a
sorting function. If we do this  

const sortFunc = (a, b) => a.localeCompare(b) * -1;

And pass the sorting function into the  component the component will see this function
as something that has changed every time and will sort the list every time. 

We need react to recognize the sorting function as the same reference everytime it checks
to see if the list being sorted needs to be re-rendered, so if somethign changes outside 
of the component 

You should use useCallback when you are craeting an onClick or onChange that is 
going into a nested component as a property.

Anytime you create a callback in a custom hook you want to use useCallback to stabilize the 
reference to the callback function. 
*/

function SortedList({ list, sortFunction} ){
  console.log("Ive been re-rendered")
  
  
  const sortedList = useMemo( 
    () => [...list].sort(sortFunction), 
    [list, sortFunction]);
  return <div>{sortedList.join(", ")}</div>
}

function App3() {
  const [names] = useState(["Tim", "Harry", "Dude", "Xavier" ]);
  const [counter, setCounter] = useState(0);



  const sortFunc = (a, b) => a.localeCompare(b) * -1;
  const sortFunc2 = useCallback ( (a, b) => a.localeCompare(b) * -1, [])

  return (
    <>
      <SortedList list={names} sortFunction={sortFunc}/>
      <SortedList list={names} sortFunction={sortFunc2} />
      <button
        onClick={() => setCounter(counter + 1)}
      >CLick Me: {counter}</button>
    </>
  )
}

export default App3;