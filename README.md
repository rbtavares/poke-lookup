# PokéLookup

PokéLookup is a simple React application to lookup Pokémon data.
This application was built using the React framework Next.js and was mostly written in TypeScript.

## Tools Used

- **Next.js** as core over the vanilla React.js to allow for performance enhancement and SSR.
- **TailwindCSS** for front-end design.
- **JestJS** for unit testing.

## Setting Up

In order to test/run the application, you should:

1. Clone the repo and `cd` into it.
2. Run `npm i` to install the required dependencies.

### Running the Application

1. To launch the development server and test the app use `npm run dev`, then open the webpage on your browser (it will default to `http://localhost:3000`)
2. To run the unit tests use `npm test`

_If you are using another package manager refer to its counterparts for installing dependencies and running node scripts._

## Interface Features

The application consists of a single page which dynamically updates as it is interacted by the user, and many function are available to allow the querying of the Pokémon data, such as:

1. A search bar, where the user may search for a Pókemon Name (case insensisitve) or a Pokémon ID.
2. A previous and next buttons to allow the user to lookup pokémons ordered by their ID.
3. A random button to allow the user to lookup a random pokémon from the list.
4. A card displaying relevant information about the pokémon being searched or an error if one occurs.
