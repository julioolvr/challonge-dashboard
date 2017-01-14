import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:6678/graphql' }),
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  );
});
