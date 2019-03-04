import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import Pokemon from './pages/Pokemon'
import PageNotFound from './pages/PageNotFound'
import SearchPokemons from './pages/SearchPokemon';
import { ThemeContext } from './Context';

/* The regex on route allow only parameter that verify:
- Is an integer
- Match with 00[1-9] : 001 to 009
- Or match with 0[1-9][0-9] : 010 to 099
- Or match with [1-7][0-9][0-9] : 100 to 799
- Or match with 80[0-7] : 800 to 807
*/

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isDark: false,
      toggleTheme: this.onThemeChange,
    };
  }

  onThemeChange = () => {
    this.setState(state => ({
      isDark: !state.isDark
    }))
  }

  render() {
    const { isDark } = this.state

    return (
      <Router>
        <ThemeContext.Provider value={this.state}>
          <div className={"pokeball-bg mh100" + (isDark ? ' is-dark' : '')}>
            <div className="container pt-3 pb-4 mh100">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/:pokemonId(00[1-9]|0[1-9][0-9]|[1-7][0-9][0-9]|80[0-7])"
                  component={Pokemon} />
                <Route exact path="/search" component={SearchPokemons} />
                <Route component={PageNotFound} />
              </Switch>
              <div className="fixed-top-right">
                <button
                  className="waves-effect waves-light btn red"
                  onClick={this.state.toggleTheme}>
                  {isDark ? 'Light theme' : 'Dark theme'}
                </button>
              </div>
            </div>
          </div>
        </ThemeContext.Provider>
      </Router>
    )
  }
}

export default App;
