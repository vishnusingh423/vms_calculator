import React from 'react';
import AppRouter from './Config/Router';
import { Provider } from 'react-redux';
import { store, persistor } from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

const stripePromise = loadStripe('pk_test_ORdW160bCSLTXF92fTqntQgZ');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </Elements>
  );
}

export default App;
