/*
We started with the code in native contect and refactored to only include what we needed
from the store we crated. We placed all the stuff that has to do with the data creation into
its own folder and exported only a provider. We don't need to pass in our custom hook into
our provider component because we did this elegantly in the stor be creating a provider 
componeent that has access to the store. 

SO the only think from the store we need is the provider and the custom hook to get the 
list of pokemon

*/

import { useState, useEffect, createContext, useContext } from 'react'

import {usePokemonSource, PokemonProvider, usePokemon}from './store';


function SearchBox() {
  const { search, setSearch } = usePokemon();
  return (
    <input
    className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
    placeholder="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  )
}

const PokemonList = () => {

  const {pokemon}= usePokemon();
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
    {pokemon.map((p) => (
      <li
        key={p.id}
        className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div className="flex-1 flex flex-col p-8">
          <img
            className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
            alt=""
          />
          <h3 className="mt-6 text-gray-900 text-sm font-medium">{p.name}</h3>
        </div>
      </li>
    ))}
  </ul>
  )
}


function App() {
 
  return (
    <PokemonProvider>
      <div className="mx-auto max-w-3xl">
        <SearchBox/>
        <PokemonList />
      </div>
    </PokemonProvider>
  )
}

export default App
