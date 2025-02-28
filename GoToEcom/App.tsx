import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';  
import { store, persistor } from './Components/src/redux/stores'; 
import Navigation from './Components/src/navigation/Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
    
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
