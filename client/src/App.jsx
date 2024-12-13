import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
});



// Set up authentication link (if needed)
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth-token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});



function App() {
    return (
        <ApolloProvider client={client}>
            <Header />
        
        <main>
            <Navbar />
            <Outlet />
            
        </main>
        <Footer />
        </ApolloProvider>
    )
}

export default App;
