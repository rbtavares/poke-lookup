// Pokemon Search Utility Functions

/**
 * Retrieves a pokemon name based on a search term.
 * @param pokemonList list of pokemon names
 * @param substring the search term to find in the list
 * @returns a string matching the result or null if not found
 */
export function findPokemonByName(pokemonList: string[], substring: string): string | null {
    return pokemonList.find(element => element.includes(substring.toLowerCase())) || null;
}

/**
 * Normalizes an arbitrary index to match an index inside the pokemon list (used mainly for next and previous of end IDs).
 * @param pokemonList list of pokemon names
 * @param index the index to be normalized
 * @returns the normalized index
 */
export function normalizeListIndex(pokemonList: string[], index: number): number {
    return (((index) % pokemonList.length) + pokemonList.length) % pokemonList.length;
}

/**
 * Normalizes the search term matching an ID or name.
 * @param pokemonList list of pokemon names
 * @param searchEntry the term/id to search for
 * @returns an ID, name or null for the pokemon being search
 */
export function searchPokemon(pokemonList: string[], searchEntry: string): string | number | null {
    const normalizedSearchEntry = searchEntry.toLowerCase().trim();

    if (normalizedSearchEntry === '')
        return null

    if (isNaN(Number(normalizedSearchEntry))) {
        // Search by Name
        if (pokemonList.includes(normalizedSearchEntry)) {
            return normalizedSearchEntry;
        } else {
            return findPokemonByName(pokemonList, normalizedSearchEntry);
        }
    } else {
        // Search by ID
        return Number(normalizedSearchEntry);
    }
}

/**
 * Fetches random Pokemon.
 * @param pokemonList list of pokemon names
 */
export function getRandomPokemon(pokemonList: string[]): string | null {
    if (pokemonList.length > 0)
        return pokemonList[Math.floor(Math.random() * pokemonList.length)];
    return null;
}

/**
 * Fetches the previous Pokemon's data.
 * @param pokemonList list of pokemon names
 * @param pokemonIndex the current Pokemon index
 */
export function getPreviousPokemon(pokemonList: string[], pokemonIndex: number): string | null {
    if (pokemonList.length > 0 && pokemonIndex >= 0)
        return pokemonList[normalizeListIndex(pokemonList, pokemonIndex - 1)]
    return null;
}

/**
 * Fetches the next Pokemon's data.
 * @param pokemonList list of pokemon names
 * @param pokemonIndex the current Pokemon index
 */
export function getNextPokemon(pokemonList: string[], pokemonIndex: number): string | null {
    if (pokemonList.length > 0 && pokemonIndex >= 0)
        return pokemonList[normalizeListIndex(pokemonList, pokemonIndex + 1)]
    return null;
}