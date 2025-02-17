import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { fetchMovies } from '../api/movieAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '../redux/shortListedMoviesSlice';
import debounce from 'lodash.debounce';

const ListingScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  // Accessing shortlisted movies from Redux store
  const shortlistedMovies = useSelector((state) => state.shortlistedMovies.movies);

  // Debounce search input
  const debouncedSearch = debounce((term) => {
    setDebouncedTerm(term);
    setPage(1);
  }, 500);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    debouncedSearch(term || '');
  };

  // Checking if a movie is already shortlisted
  const isShortlisted = (imdbID) => shortlistedMovies.some((movie) => movie.imdbID === imdbID);

  // Adding or Removing movie from shortlist
  const toggleShortlist = (movie) => {
    if (isShortlisted(movie.imdbID)) {
      dispatch(removeMovie(movie)); // Remove if already in shortlist
    } else {
      dispatch(addMovie(movie)); // Add if not in shortlist
    }
  };

  // Fetching movies using react-query
  const { data, isLoading, isFetching, isError } = useQuery(
    ['movies', debouncedTerm, page],
    () => fetchMovies(debouncedTerm || 'action', page),
    {
      enabled: true,
      keepPreviousData: true,
    }
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        value={searchTerm}
        onChangeText={handleSearchChange}
      />

      {isError && <Text style={styles.errorText}>Error fetching data. Please try again later.</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={data?.Search || []}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={
                  item.Poster !== 'N/A'
                    ? { uri: item.Poster }
                    : {
                        uri: 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=',
                      }
                }
                style={styles.poster}
              />
              <View style={styles.details}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.title}>({item.Year})</Text>

                <Button
                  title={isShortlisted(item.imdbID) ? 'Shortlisted' : 'Shortlist'}
                  onPress={() => toggleShortlist(item)}
                  color={isShortlisted(item.imdbID) ? '#32CD32' : '#FF6347'}
                />
              </View>
            </View>
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetching ? <ActivityIndicator size="small" color="#007BFF" style={styles.loading} /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  searchBar: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    margin: 15,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  movieItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  details: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  loading: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ListingScreen;
