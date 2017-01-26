import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:6678/graphql';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: backendUrl }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
