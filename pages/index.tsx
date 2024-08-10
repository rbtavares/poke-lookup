import { getPreviousPokemon, getNextPokemon, getRandomPokemon, searchPokemon } from '@/utils/pokemonUtils';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const BASE_LIST_SIZE = 2500;

interface IPokemonResponseListEntry {
  name: string,
  url: string
}

interface IPokemonData {
  id: number,
  name: string,
  height: number,
  weight: number,
  order: number,
  base_experience: number,
  sprite: string | null
}

export default function Home() {

  // Total Pokemon List for Indexing
  // this list will keep track of all pokemons available to fetch data from, as some ids are not sequential
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  const fetchPokemonList = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${BASE_LIST_SIZE}`)
    const result = await response.json();

    const listSize = result['count'];
    const pokemonListTemp: string[] = result['results'].map((entry: IPokemonResponseListEntry) => entry.name);

    if (pokemonListTemp.length < listSize) {
      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset${BASE_LIST_SIZE}&limit=${listSize - BASE_LIST_SIZE}`)
      const result2 = await response2.json();

      pokemonListTemp.push(...(result2['results'].map((entry: IPokemonResponseListEntry) => entry.name)));
    }

    setPokemonList(pokemonListTemp);
  }

  useEffect(() => {
    fetchPokemonList();
  }, []);

  // Pokemon Data
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const [pokemonIndex, setPokemonIndex] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchPokemonData = async (entry: string | Number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry}/`);

      if (!response.ok)
        setFetchError("unknown")

      try {
        const result = await response.json();
        setFetchError(null);
        setPokemonData({
          id: result['id'],
          name: result['name'],
          height: result['height'],
          weight: result['weight'],
          order: result['order'],
          base_experience: result['base_experience'],
          sprite: result['sprites']['other']['official-artwork']['front_default']
        });
        setPokemonIndex(pokemonList.indexOf(result['name']));
      } catch (error) {
        setFetchError("Could not parse the received JSON object.")
      }
    } catch (error) {
      setFetchError("Could not fetch a response from PokeAPI.");
    }
  };

  // Search Handler
  const [searchEntry, setSearchEntry] = useState<string>("");

  const handleSearch = () => {
    const result = searchPokemon(pokemonList, searchEntry);

    if (typeof result === 'string' || typeof result === 'number') {
      fetchPokemonData(result);
    } else {
      setFetchError("Could not find a match.");
    }
  };

  // Navigation Buttons
  const handleRandom = () => {
    const pokemon = pokemonList && getRandomPokemon(pokemonList);
    pokemon && fetchPokemonData(pokemon);
  }

  const handlePrevious = () => {
    const pokemon = pokemonList && pokemonIndex != null && getPreviousPokemon(pokemonList, pokemonIndex);
    pokemon && fetchPokemonData(pokemon);
  }

  const handleNext = () => {
    const pokemon = pokemonList && pokemonIndex != null && getNextPokemon(pokemonList, pokemonIndex);
    pokemon && fetchPokemonData(pokemon);
  }

  return (
    <main className={`flex flex-col gap-4 min-h-screen bg-white ${roboto.className} p-4`}>
      {/* Navbar */}
      <div className="grid grid-cols-3 bg-white-500 min-h-14 p-2 bg-gradient-to-b from-white to-red-50 w-full items-center border-b-4 border-red-500">
        {/* Left */}
        <div className="flex items-center">
          <h1 className='inline-block text-5xl font-bold bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent'>PokéLookup</h1>
        </div>
        {/* Center */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className='italic text-sm text-red-200'>search over {pokemonList && pokemonList.length + " pokemons ..."}</span>
          <div className='flex gap-2'>
            <input placeholder="name or id" className="border-zinc-300 border-[1px] px-1 rounded-sm" onChange={e => setSearchEntry(e.target.value)} />
            <button className="flex bg-red-600 border-red-700 border-[1px] rounded-sm p-1" onClick={handleSearch}><Image src="/search.svg" width={20} height={20} alt="search icon" /></button>
          </div>
        </div>
        {/* Right */}
        <div className="flex gap-4 justify-end">
          <button className="flex items-center bg-red-600 border-red-700 text-white gap-1 border-[1px] px-1 py-0.5 rounded" onClick={handlePrevious}><Image src="/arrowleft.svg" width={20} height={20} alt="previous icon" /> Previous</button>
          <button className="flex items-center bg-red-600 border-red-700 text-white gap-1 border-[1px] px-1 py-0.5 rounded" onClick={handleNext}><Image src="/arrowright.svg" width={20} height={20} alt="next icon" /> Next</button>
          <button className="flex items-center bg-red-600 border-red-700 text-white gap-1 border-[1px] px-1 py-0.5 rounded" onClick={handleRandom}><Image src="/dice.svg" width={20} height={20} alt="random icon" /> Random</button>
        </div>
      </div>

      {/* Main Content*/}
      <div className='p-5 flex justify-center'>
        <div className='p-5 bg-zinc-100 rounded items-center flex flex-col gap-2'>
          {fetchError ?
            (<>
              <h1 className='text-3xl font-bold text-center'>An error occurred!</h1>
              <h2>{fetchError}</h2>
            </>)
            :
            (pokemonData ?
              (<>
                <h1 className='text-3xl inline-block font-bold text-center'>{pokemonData['name']} <span className='font-mono font-normal text-xs'>(ID: {pokemonData.id})</span></h1>
                <img src={pokemonData.sprite || '/notfound.svg'} alt="Pokemon" width={200} height={200} />
                <ul>
                  <li>Species: {pokemonData.name}</li>
                  <li>Height: {pokemonData.height}</li>
                  <li>Weight: {pokemonData.weight}</li>
                  <li>Order: {pokemonData.order}</li>
                  <li>Base EXP: {pokemonData.base_experience}</li>
                </ul>
              </>)
              :
              (<>
                <h1 className='text-3xl font-bold text-center'>Search for a pokémon...</h1>
              </>)
            )
          }
        </div>
      </div>
    </main>
  );
}