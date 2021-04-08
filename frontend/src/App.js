import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/Screens/HomeScreen';
import ProductScreen from './components/Screens/ProductScreen';


function App() {
  return (
    <div className="grid-container">
            <header className="row">
                <div>
                    <a  className="brand" href="/">Tina shop</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign in</a>
                </div>
            </header>
            <main>
                <BrowserRouter>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                    
                </BrowserRouter>
            </main>
            <footer className="row center">
                All right reserved
            </footer>
        </div>
  );
}

export default App;
