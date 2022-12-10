/*When you update a value to a reference using useRef will keep the page from reloading. 

What does that mean? There are two main uses

1.Lets say we want to create a new element on the page baesd on some 
interaction by the user.

We want to add that element to the page without re-rendering. This is where useRef comes in
and it is usually used in concert with useEffect

2. When we want to keep track of state without re-rendering the page
We want the input element to add to our list of names without re-rendering the page.
We can create a function called onAddnames  that sets the new name. 
But we also need  to set the value of the ID. In orde to do this we need ot understand
that we don't want to update the page when this value updates as well 

*/
import {useRef, useEffect, useState} from "react";


function App() {

  //This is just a referece to the object that will becreated later
  const inputRef = useRef(null); 
  //Now we just want a reference to the ID when the page renderes which will be 1
 
  const idRef = useRef(1);

  //When we set the ID when the page rendered we can just "reference the idRef"
  const [names, setNames] = useState([
    {id: idRef.current++, name: "John"},
    {id: idRef.current++, name: "Jane"}
  ]);

  const onAddName = () => {
    setNames([...names, {
      id: idRef.current++, 
      name:inputRef.current.value
    }]);
    inputRef.current.value = "";
    console.log(names);
  };

  useEffect( () => {
    //The inputRef is just a pointer to the current value of that reverence.
    //This is how you access and operate on the reference. We call.current and then
    //we have access to DOM methods like focus to focus on the imput. 
    inputRef.current.focus();
  }, []);

  /*Now when the page loads the input that is not generated yet will have focus after 
  it is rendered ot the page
  */
  return (
    <div>
      <div>
        {names.map( (name) => (
          <div key={name.id}>{name.id} - {name.name}</div>
        ))}
      </div>
        {/* Notice how the ref is pointing to use ref of the input so we can use
        dom manipulation to focus on this input when the page renders even though
        the element is not created */}
        <input type="text" ref={inputRef} />
        <button onClick={onAddName}>Add Name</button>    
    </div>
  )
}

export default App
