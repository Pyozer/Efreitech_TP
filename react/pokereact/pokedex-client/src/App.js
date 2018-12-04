import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logoPokedex from './assets/Pokedex_logo.png';
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import PageNotFound from './pages/PageNotFound'
import './css/App.css';

const App = () => (
  <Router>
    <div className="container">
      <header className="App-header">
        <Link to="/" title="Home">
          <img src={logoPokedex} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:pokemonId" exact component={Pokemon} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
)

export default App;
