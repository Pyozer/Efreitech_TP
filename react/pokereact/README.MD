# POKEREACT

PokeReact is a school project to learn NodeJS and React.
This app is a PokeDex, the website build with React, display pokemons informations, fetched from the API server (NodeJS)

I used create-react-app to build React App and Express to make the node server.

There is two route on the server:

| Method | Route                | Description                                              |
|--------|----------------------|----------------------------------------------------------|
| GET    | /                    | Simple route that just display "Welcome to pokedex API"  |
| GET    | /pokemons            | Get all pokemons, with their informations                |
| GET    | /pokemons/:pokemonId | Get all informations of a specific pokemon (by his ndex) |

## Structure of JSON response

If request is a success :

```
{
    "status": "success",
    "code": 200,
    "data": Object | Array
}
```

If request failure :

```
{
    "status": "error",
    "code": 400 | 500,
    "message": "An error message"
}
```

## Usage

To launch the app, start first the Node server :
`cd pokedex-server && yarn start`

And then launch the react app :
`cd pokedex-client && yarn start`

You can build the react app for production with this command:
`yarn build`

**Info:** You can use `npm` instead of `yarn` if you want

## Screenshots

### Home page

<img src="https://raw.githubusercontent.com/Pyozer/PokeReact/master/demo_img/home.png" width="550" alt="Home page">

### Pokemon page

<img src="https://raw.githubusercontent.com/Pyozer/PokeReact/master/demo_img/pokemon_infos_1.png" width="550" alt="Pokemon page">

<img src="https://raw.githubusercontent.com/Pyozer/PokeReact/master/demo_img/pokemon_infos_2.png" width="550" alt="Pokemon page 2">

### Search a pokemon by ID

<img src="https://raw.githubusercontent.com/Pyozer/PokeReact/master/demo_img/search_by_id.png" width="550" alt="Search by ID">

<img src="https://raw.githubusercontent.com/Pyozer/PokeReact/master/demo_img/search_by_id_results.png" width="550" alt="Search by ID">