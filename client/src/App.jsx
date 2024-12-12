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
    uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URI
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
            <Footer />
        </main>
        </ApolloProvider>
    )
}

export default App;
