// src/screens/ShortlistedMoviesScreen.tsx
import React from 'react';
import { View, FlatList, Text, Button, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeMovie } from '../redux/shortListedMoviesSlice';


const ShortlistedMoviesScreen = () => {
  const shortlistedMovies = useSelector((state: any) => state.shortlistedMovies.movies);
  const dispatch = useDispatch();

  const handleRemoveFromShortlist = (movie: any) => {
    dispatch(removeMovie(movie));
  };

  return (
    <View>
      <FlatList
        data={shortlistedMovies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.Title}</Text>
              <Button title="Remove" onPress={() => handleRemoveFromShortlist(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  details: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShortlistedMoviesScreen;
