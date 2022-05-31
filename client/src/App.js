import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

// bring in ApolloClient, the cache where data and queries are cached and ApolloProvider which allows us to create a sort of global scope, the data wherein can be accessed by any child components
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

//import pages and components
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Demo from './pages/Demo';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      List: {
        fields: {
          items: {
            merge(existing, incoming){
              return incoming
            },
          },
        },
      },
      // Category: {
      //   fields: {
      //     lists: {
      //       merge(existing, incoming){
      //         return incoming
      //       },
      //     },
      //   },
      // },
    },
  }),
});

// make the ApolloProvider the parent for all other components and give it access to the ApolloClient. This ensures all components can get to the data from GraphQL

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div id="react-content-container" className="container">
          <Header />
          <main>
            <Routes>
              <Route 
                path="/" 
                element={<Welcome />} 
              />
              <Route 
                path="/home" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route
                path="/demo"
                element={<Demo />}
              />
              <Route 
                path="*" 
                element={<Welcome />} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

