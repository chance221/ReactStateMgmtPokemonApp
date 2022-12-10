import { useReducer } from 'react'
import  App2  from './Notes/useMemoNotes'
import App3 from './Notes/useCallback';


function UserForm(){

  //If you are just rendering values to the screen tou don't need a dispatcher, you just 
  //need to return or rather dispatch the updated state. No switch is performed because
  //you are just returning the action of the dispatch, which is the updated value of the inputs.
  //If you had more tha one possible operations on the state you could then use a switch 
  //and perform that specific action no that specific piece of state. 
  const [state, dispatch] = useReducer( (state, action) => {
    return {
      ...state,
      ...action
    }
  }, {
      first: "",
      last: ""    
  });


    return (
      <div>
        <div>
          Name List:
          <ul>
            {state.first} {state.last}
          </ul>

        </div>
        <input type="text"
        onChange={ (e) => dispatch({first: e.target.value})}
          value={state.first}    
        />
        <input type="text"
        onChange={ (e) => dispatch({last: e.target.value})}
          value={state.last}    
        />
      </div>
    )
}

function NameList() {
  //When you are using a reducer you need to pass in an invoking finction or a dispatch, and the state's initial value.
  // In out state we have an array of names and a name as state property
  //In out dispatch function we need to have the function that updates one ofthe states.
  //You basically always start with this 
  //const [state, dispatch = useReducer((state,action) {}, {})]
  //The second object is the initial state so we tant to have a names array and a name state
  //This is what is will look like after you set the state of the first

  /*
  const [state, dispatch = useReducer((state,action) {}, {
    names: [],
    name: "",
  })]

  This sets the initial value of the reducer to its default state.
  
  You now then need to pass in an object the performs actions agains the state to update
  the states properties

  
  This sets the state to the values it needs to be upon updating and rerenders the screen
  
  const [state, dispatch] = useReducer( (state, action) =>{
    switch(action.type) {
      //so when the action type is SET_NAME it returns a new state object with the new name
      case "SET_NAME":
        return {...state, name: action.payload};
      //When the type is add name it returns all new state object updatin0g both the name and names properties of state
      case "ADD_NAME":
        return {...state, names: [...state.names, action.payload],  name: ""}
        
    }
  } ,{
    names: [],
    name: "",
  });

  You then need to return the values in the rendered portion of your component.
  The full component is below.
  */
  
  const [state, dispatch] = useReducer( (state, action) =>{
    switch(action.type) {
      //so when the action type is SET_NAME it returns a new state object with the new name
      case "SET_NAME":
        return {...state, name: action.payload};
      //When the type is add name it returns all new state object updatin0g both the name and names properties of state
      case "ADD_NAME":
        return {...state, names: [...state.names, action.payload],  name: ""}
        
    }
  } ,{
    names: [],
    name: "",
  });
  return (
    <div className="App">
      <div>
        <div>
          <ul>
            {state.names.map( (name, index) => (
                        <li key={index}>
                        {name}
                        </li>
                      ))}
          </ul>          
        </div>
        <input
          type="text"
          value={state.name}
          onChange={e=> dispatch({type: "SET_NAME", payload: e.target.value})}
        />
        <div>Name: {state.name}</div>
      </div>
      <button
        onClick={ () => dispatch({ type: "ADD_NAME", payload: state.name})}
      >
        Add Name
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <UserForm/>
      <NameList/>
      <App2/>
      <App3 />
    </div>
    
  )
}

export default App
