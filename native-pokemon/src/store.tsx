import { 
  useState, 
  useReducer, 
  useEffect, 
  createContext, 
  useContext, 
  useCallback, 
  useMemo 
} from 'react'

//When creating the store to provie content use the following steps


// 1. Create the interface. This needs to be knows to the function passing the objects
//    around
interface Pokemon{
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

// 2. Create the custom hook that fetches the data. This is what will be called to interact
//    with the pokemon state. 
export function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  /*Becaue we are not invoking this until a later user interaction we just want to expose a function that 
    will update the state. No need to expose a function that upates the pokemon directly as we are setting
    this based on the search. ANYTIME you want the state to interact with the user you need to expose a 
    function in the custom hook to update the state accordingly.*/
  setSearch: (search: string) => void;
} {
/* Instead of using the useState we will use the reducer to keep track of the state properties.
/  We define the types that will be passed into the reducer. We need to define the state object
/  this custom hook will be responseible for. */
type PokemonState = {
  pokemon: Pokemon[];
  serach: string;
}

/*Just like the useStateHook we need a wayto set the state using a dispatcher. But first we need to define
  the actions to dispatch, and the type of state property that will be returned.  */
type PokemonAction = 
  { type: "setPokemon"; payload: Pokemon[] } |
  { type: "setSearch"; payload: string};

  //This is the reducer. We need to deconstruct what will be returned from the 
const [{pokemon, search}, dispatch] = useReducer(
  (state: PokemonState, action: PokemonAction): any => {
  switch(action.type){
    case "setPokemon":
      return{ ...state, pokemon: action.payload } 
    case "setSearch":
      return{ ...state, search: action.payload} 
  }
},
{
  pokemon: [],
  search: "",
}
);

  useEffect ( () => {
    fetch("/pokemon.json")
    .then( (response) => response.json())
    .then((data) => dispatch({
      type: "setPokemon",
      payload: data
    }));
  }, [])

  /* This is the functin that will update the search state. ALWAYSE USE useCallback 
  WHEN RETURNING A FUNCTION FROM CUSTOM HOOKS*/
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    })
  }, []);

  /* This is the callback function that updates the list based on the search.
     Always use useMemo when calculating a value based on state. We have a search box  that
     filters the list. It updates when either the pokemon or the search box changes. 
     We know this because each piece of state is held in the dependency array which
     is the second argument passed into useMemo. This function now knows only to update
     when either changes. There is a trigger to update the state when text is entered into
     the search. This automatically filters the list*/
  const filteredPokemon = useMemo ( () => 
    pokemon.filter( (p:Pokemon) => p.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0,20)
    , [pokemon, search]
  )

/* now we are performing additinal operatins on the filtered list. We are just sorting here, 
   but we could sort or filter however we want like toggele additional filters 

*/
  const sortedPokemon = useMemo( () =>
    [...filteredPokemon].sort( (a,b) => a.name.localeCompare(b.name))
    , [filteredPokemon] );

  /* Whatever your custom hook needs access to in the child component must be returned here. 
     NOT EVERYtHING NEEDS TO BE RETURNED. The pokemon returned runs through the filteredPokemon
     function first which is a slick way of handling filtering in react. 
     */
  return { pokemon: sortedPokemon, search, setSearch };
}


// 3. Create the context that will hold the data. Remember you can do it this way, or the other
//    way that creates an empty object and sets it as the return type of the custom hook above 
//    (refer to native context for more deetails)
const PokemonContext = createContext<
  ReturnType<typeof usePokemonSource> | undefined
>(undefined);


//4. Create the custom hook that exports the context without exposing the useContext call 
//to other components. This returns the context above which defines everything in the store
//we want exposed to the calling component
export function usePokemon() {
  return useContext(PokemonContext)!;
}


//create a provider that will accept react elements as children and then call the custom
//hook that will provide the data, in this case usePokemonSource.
export function PokemonProvider ({
  children, 
} : {children: React.ReactNode;

}) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  )
}

