import React from "react";

// extends fomr component to make sure that this works as a react component
export default class PokemonDisplay extends React.Component{
    constructor(props){
        super(props);

        // state stores data per component
        this.state = {
            pokemonName: null
        }
    }

    async componentDidMount(){
		console.log("This message will appear once.");

		// Grab a Pokemon and store its name 

		// Generate a random number or use a user-provided number
		function getRandomPokemonId(){
			return Math.floor(Math.random() * 1010) + 1
		}

		// Retrieve the API data
		let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId()).catch(error => {
			throw new Error("API failure.");
		});

		if (response.status === 404){
			throw new Error("API did not have data for the requested ID.");
		}

		// Convert the response into usable JSON 
		let data = await response.json().catch(error => {
			throw new Error("API did not return valid JSON.");
		}); 

		// Save Pokemon name to component state 
		this.setState({pokemonName: data.name});
	}

    componentWillUnmount(){
        console.log('component is being removed');
    }

    render(){

		if (this.state.pokemonName) {
			return (
				<div>
					<h1>{this.state.pokemonName}</h1>
				</div>
			)
		} else {
			return(
				<div>
					<h1>Loading...</h1>
				</div>
			)
		}
	}
}