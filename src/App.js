import './index.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Todo from './Components/Todo/Todo';
import { ListProvider } from './Components/Todo/List/ListContext';

function App() {
    return (
        <ListProvider>
            <Header />
            <h1> TODO LIST</h1>
            <Todo />
            <Footer />
        </ListProvider>
    );
}

export default App;