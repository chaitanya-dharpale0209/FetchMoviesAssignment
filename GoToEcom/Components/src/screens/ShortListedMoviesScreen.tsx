import React, { memo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeMovie } from '../redux/shortListedMoviesSlice';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ShortlistedMoviesScreen = () => {
  const shortlistedMovies = useSelector((state) => state.shortlistedMovies.movies);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const handleRemoveFromShortlist = (movie) => {
    Alert.alert(
      'Remove Movie',
      `Are you sure you want to remove "${movie.Title}" from your shortlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeMovie(movie))
        }
      ]
    );
  };

  const renderRightActions = (progress, dragX, movie) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <Animated.View
        style={[
          styles.deleteAction,
          {
            transform: [{ translateX: trans }],
          },
        ]}>
        <TouchableOpacity
          onPress={() => handleRemoveFromShortlist(movie)}
          style={styles.deleteButton}>
          <Icon name="delete" size={24} color="#fff" />
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const MovieItem = ({ item }) => {
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
        <GestureHandlerRootView>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, item)
          }>
          <View style={styles.movieItem}>
            <Image
              source={{ uri: item.Poster }}
              style={styles.poster}
            />
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={2}>
                {item.Title}
              </Text>
              <Text style={styles.year}>{item.Year}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{item.imdbRating}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromShortlist(item)}>
                <Icon name="remove-circle-outline" size={20} color="#FF4444" />
                <Text style={styles.removeText}>Remove from Shortlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swipeable>
      </Animated.View>
      </GestureHandlerRootView>
    );
  };

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="movie" size={64} color="#ccc" />
      <Text style={styles.emptyText}>No movies in your shortlist</Text>
      <Text style={styles.emptySubtext}>
        Movies you shortlist will appear here
      </Text>
    </View>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Shortlist</Text>
        <Text style={styles.movieCount}>
          {shortlistedMovies.length} {shortlistedMovies.length === 1 ? 'Movie' : 'Movies'}
        </Text>
      </View>
      <FlatList
        data={shortlistedMovies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieItem item={item} />}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  movieCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  movieItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  removeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FF4444',
  },
  deleteAction: {
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    marginTop: 16,
    marginRight: 16,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default memo(ShortlistedMoviesScreen);