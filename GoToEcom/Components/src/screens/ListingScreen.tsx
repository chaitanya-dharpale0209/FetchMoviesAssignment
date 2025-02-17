import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, Image, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { fetchMovies } from '../api/movieAPI';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/shortListedMoviesSlice';
import debounce from 'lodash.debounce';

const ListingScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [page, setPage] = useState(1);  // State to track page number
  const dispatch = useDispatch();

  const debouncedSearch = debounce((term: string) => {
    setDebouncedTerm(term);
    setPage(1); // Reset page to 1 when new search term is entered
  }, 500);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    ['movies', debouncedTerm, page],
    () => fetchMovies(debouncedTerm, page),
    { 
      enabled: !!debouncedTerm,  // Only fetch if the search term is valid
      keepPreviousData: true,  // Maintain previous data while loading new page
    }
  );

  const handleAddToShortlist = (movie) => {
    dispatch(addMovie(movie));
  };

  const handleLoadMore = () => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={data?.Search || []}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.Title}</Text>
              <Button title="Shortlist" onPress={() => handleAddToShortlist(item)} />
            </View>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <Text>Loading...</Text> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
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

export default ListingScreen;
