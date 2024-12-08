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

function App() {
    return (

        <main>
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default App;
