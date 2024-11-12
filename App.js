import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              url: pokemon.url,
              height: pokemonData.height,
              weight: pokemonData.weight,
              abilities: pokemonData.abilities,
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Erro ao buscar a lista de Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null); 
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pokémon</Text>
      <FlatList
        data={pokemonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pokemonContainer}
            onPress={() => handlePokemonSelect(item)}
          >
            <Image source={{ uri: item.image }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedPokemon && (
        <View style={styles.detailsContainer}>
          <Text style={styles.pokemonName}>{selectedPokemon.name}</Text>
          <Image source={{ uri: selectedPokemon.image }} style={styles.pokemonImageLarge} />
          <Text>Altura: {selectedPokemon.height}</Text>
          <Text>Peso: {selectedPokemon.weight}</Text>
          <Text>Habilidades:</Text>
          {selectedPokemon.abilities.map((ability, index) => (
            <Text key={index}>- {ability.ability.name}</Text>
          ))}
          
          {/* Botão de Fechar Detalhes abaixo das informações */}
          <TouchableOpacity onPress={handleCloseDetails} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar Detalhes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  pokemonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonImageLarge: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  pokemonName: {
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    marginTop: 15, 
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
