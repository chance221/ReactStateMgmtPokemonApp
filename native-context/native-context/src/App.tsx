/*
Here we are crating a custom hook to fetch the data from the json file we have in the public
folder using Typescript. This means when we set up the state of the list that will hold the array
of Pokemon TypeScript needs to know what type will be in that array.

This iswhere interfaces come in. Bu setting the type using an interface its a quick way of infering
a class. 

1) Custom hooks are impllemented as functions. When you crate the function you should state its
return type. notice the : { pokemon: Pokemon}. The Pokemon is defined in the interface
2) We are fetching alot of data so we probaoly only want to do this once. We use
useEffect to get the data set
3)We also want to include only what is going to be in the array. Its an array of Pokemon
which we define in an interface

*/

import { useState, useEffect, createContext, useContext } from 'react'

//Typescipt need to know what is bring returned so wecanre an intergace object
//that represents the data returned for each pokemon
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

//This creates the hook that will fetch out pokemon data
//Using Typescript we state what the return type of the function will be.
//In this case it will be an array of Pokemon.
//We set the state. We call this in the Context Provide which
//will wrap around all components that need to have access to this
//portion of state. 
//So when we define the function using typescript we need to tell it the parameters
//In this case we are taking in a named parameter called pokemon. We need to define 
// that parameters type. So we are defininf a function usePokemonSource that has a return
//type of pokemon which is an array of Pokemon interfaces
function usePokemonSource(): {
  pokemon: Pokemon[];
} {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  //we perform the fetch and then set the state based on the returned value.
  useEffect ( () => {
    fetch("/pokemon.json")
    .then( (response) => response.json())
    .then((data) => setPokemon(data));
  }, [])

  return { pokemon };
}

/*
Now we are going to create a Pokemon context and then wrap components that consume
thos pieces of context wihtin the context component. In this case we are creating a context
that will consume an array of Pokemon interfaces

We can define the PokemonContext as returning the type that is defined as being
returned in our customHook usePokemonSource. Remember usePokemonSource just
looks at the context and sets the pokemon state in the component that consumes the
usePokemonSource custom hook. 

This works 

const  PokemonContext = createContext({
  pokemon: [] as Pokemon[],
})
Now if we add typing we can get a little fancier 


Now whatever out return type of usePokemonSource the PokemonContext can handle it. 
But we are saying that this could potentially be undefined. So weneed to add 
get a little fancier by doing this

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource> 
);

We don't nee dto add the bang operator when refering to the context be are stating may be
returned as undefined because it will set it as an empty object of the return type received
from the usePokemonSource custom hook. 
OR we could do this

We need to add the bang operator whenever we refer to use context if we do it this way
*/
const PokemonContext = createContext<
  ReturnType<typeof usePokemonSource> | undefined
>(undefined);


//now we create the hook the returns the context instead of refering to
//the context directly in each component. 
function usePokemon(): { pokemon: Pokemon[]; } {
  return useContext(PokemonContext)!;
}

//Now that we have the data source lets generate a list of Pokemon in a component
//that takes in that list of Pokemon and then renders the info to the screen.
//notice we are not passin in the list as a parameter just consuming the 
//context by refering to our custom hook usePokemon
const PokemonList = () => {
  //notice how you are deconstructing the pokemon from the context. We don't want
  //to interact with the context directly so we have a function that returns
  //the call to useContext
  const {pokemon}= usePokemon();
  return (
    <div>
      {pokemon.map( (p) => (
        <div key = {p.id}>{p.name}</div>
      ))}
    </div>
  )
}


function App() {
  //now we just call our custom hook usePokemonSource that fetches the pokemon. 
  //we return our pokemons list functinal component. Instead of prop drilling
  //we pass it in by refering to react context  which means in the Pokemon list
  //component we just refer to the context
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      <PokemonList />
    </PokemonContext.Provider>
  )
}

export default App
