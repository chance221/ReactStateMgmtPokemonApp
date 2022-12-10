import { useState, useEffect } from 'react'

 //The main point is to only use useEffect minimally, and invoke this hook when you 
//are NOT responding to user interactions. For example we use useEffect to populate
//the buttons, but we do not want to use useEffect to respond to their clicks. We
//just want to invoke the use data update when needed. 

//We want to keep track of and display time, but every time the interval is set
//we run into the same issue with infinite loops. We want to use useEffect in both
//cases to make our component more predictable. 


/*When having a setter when it comes to time we don't want to do this which is just 
//enclose the setter within the loop. We instead want to set the time using a function
//that way the time the function is based on is no longer enclosed in the useEffect
//call that is responsible for re-rendering the screen. So don't do this
/*
Stopwatch = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
      setInterval( () => {
      setTime(time + 1);
      }, 1000);
    }, [] 
  )
  */ 
 //Instead do this.  
const Stopwatch = () =>{
  const [time, setTime] = useState(0)
  useEffect ( () => {
    //create a variable to hold the interval to later clear
    const interval = setInterval ( () => {
      //because setTime just sets the 'time' state property you don't need to operate on
      //the property just a variable that will represent the present state
      setTime( (t) =>{
        console.log(t);
        return t + 1;
      });
    }, 1000);
    //This is a clean up function that gets rid of the counter after it updates the state. 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Time: {time}
    </div>
  );
}

function App() {
  const [names, setName] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedNameDetails, setSelectedNameDetails] = useState(null);



  /*
  This could potentially return a infinite loop when seting initial values from api calls 
  because the state is updating every time the list renderes from the async call, so it
  restarts the process. 

    fetch("/names.json")
      .then( (response) => response.json())
      .then( (data) => setName(data));

  By using useEffect we can add initial state data once without a re-render. 
  */
  useEffect ( () => {
    fetch("/names.json")
    .then( (response) => response.json())
    .then( (data) => setName(data));
  }, []);



  //this actally is not the way to do it. We want to have a callback that is invoked only
  //when necessary so instead of this to render only when a state property is not null
    // useEffect ( () => {
    //   if(selectedName) {
    //     fetch(`/${selectedName}.json`)
    //     .then( (response) => response.json())
    //     .then( (data) => setSelectedName(data));
    //   }
    // }, [selectedName])
  
  //We want this function which will be called when the user interacts with the UI
  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
    .then( (response) => response.json())
    .then( (data) => setSelectedNameDetails(data));
  }
  
 
  return (
    <div>
    <Stopwatch></Stopwatch>
      <div>
        {names.map( (name, i) => 
          <button key ={i} onClick={() => onSelectedNameChange(name)}> {name} </button>)}
      </div>
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  )
}

export default App;
