import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logoPokedex from './assets/Pokedex_logo.png';
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import PageNotFound from './pages/PageNotFound'
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header className="App-header">
            <img src={logoPokedex} className="App-logo" alt="logo" />
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:pokemonId" exact component={Pokemon} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
