import { findPokemonByName, normalizeListIndex, searchPokemon, getPreviousPokemon, getNextPokemon } from '../utils/pokemonUtils';

// Tests for 'findPokemonByName()'
describe('findPokemonByName', () => {
    it('find the correct Pokemon when the substring is in the list (beginning)', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const result = findPokemonByName(pokemonList, 'ivy');
        expect(result).toBe('ivysaur');
    });

    it('find the correct Pokemon when the substring is in the list (middle)', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const result = findPokemonByName(pokemonList, 'ysa');
        expect(result).toBe('ivysaur');
    });

    it('find the correct Pokemon when the substring is in the list (end)', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const result = findPokemonByName(pokemonList, 'ysaur');
        expect(result).toBe('ivysaur');
    });

    it('return null if no Pokemon matches the substring', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const result = findPokemonByName(pokemonList, 'char');
        expect(result).toBeNull();
    });

    it('return the correct Pokemon even with mixed casing', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const result = findPokemonByName(pokemonList, 'IvYsA');
        expect(result).toBe('ivysaur');
    });

    it('return null if the list is empty', () => {
        const pokemonList: string[] = [];
        const result = findPokemonByName(pokemonList, 'bulbasaur');
        expect(result).toBeNull();
    });
});

// Tests for 'normalizeListIndex()'
describe('normalizeListIndex', () => {
    it('return the same index if it is within the list bounds', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const index = 1;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBe(1);
    });

    it('return the correct positive index if the index is negative', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const index = -1;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBe(2);
    });

    it('return the correct index if the index is greater than the list length', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const index = 5;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBe(2);
    });

    it('should handle very large positive indices', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const index = 100;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBe(1); // 100%3 == 1
    });

    it('should handle very large negative indices', () => {
        const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur'];
        const index = -100;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBe(2); // -100%3 == 1
    });

    it('should handle an empty list by returning NaN', () => {
        const pokemonList: string[] = [];
        const index = 5;
        const result = normalizeListIndex(pokemonList, index);
        expect(result).toBeNaN();
    });
});

// Tests for 'searchPokemon()'
describe('searchPokemon', () => {
    const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander'];

    it('return the name if the searchEntry matches a name exactly', () => {
        const searchEntry = 'ivysaur';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBe('ivysaur');
    });

    it('return the name in a case-insensitive manner', () => {
        const searchEntry = 'IVYsaur';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBe('ivysaur');
    });

    it('return the name when a substring matches', () => {
        const searchEntry = 'char';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBe('charmander');
    });

    it('return the ID if the entry is a number', () => {
        const searchEntry = '5';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBe(5);
    });

    it('return null if no match is found', () => {
        const searchEntry = 'pikachu';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBeNull();
    });

    it('return null if an empty string is provided', () => {
        const searchEntry = '';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBeNull();
    });

    it('trim whitespace from the searchEntry before searching', () => {
        const searchEntry = '   bulbasaur   ';
        const result = searchPokemon(pokemonList, searchEntry);
        expect(result).toBe('bulbasaur');
    });
});

// Tests for 'getPreviousPokemon()'
describe('getPreviousPokemon', () => {
    const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander'];

    it('return the previous Pokemon in the list', () => {
        const previousPokemon = getPreviousPokemon(pokemonList, 2);
        expect(previousPokemon).toBe('ivysaur');
    });

    it('wrap around to the last Pokemon if the index is at the start', () => {
        const previousPokemon = getPreviousPokemon(pokemonList, 0);
        expect(previousPokemon).toBe('charmander');
    });

    it('return null if the list is empty', () => {
        const previousPokemon = getPreviousPokemon([], 0);
        expect(previousPokemon).toBeNull();
    });

    it('return null if the index is negative', () => {
        const previousPokemon = getPreviousPokemon(pokemonList, -1);
        expect(previousPokemon).toBeNull();
    });
});

// Tests for 'getNextPokemon()'
describe('getNextPokemon', () => {
    const pokemonList = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander'];

    it('return the next Pokemon in the list', () => {
        const nextPokemon = getNextPokemon(pokemonList, 2);
        expect(nextPokemon).toBe('charmander');
    });

    it('wrap around to the first Pokemon if the index is at the end', () => {
        const nextPokemon = getNextPokemon(pokemonList, pokemonList.length - 1);
        expect(nextPokemon).toBe('bulbasaur');
    });

    it('return null if the list is empty', () => {
        const nextPokemon = getNextPokemon([], 0);
        expect(nextPokemon).toBeNull();
    });

    it('return null if the index is negative', () => {
        const nextPokemon = getNextPokemon(pokemonList, -1);
        expect(nextPokemon).toBeNull();
    });
});
