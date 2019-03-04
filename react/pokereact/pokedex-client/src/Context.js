import React, { Component } from 'react';

const DEFAULT_TITLE = "PokeDex";

export class PageTitle extends Component {
    componentDidUpdate() {
        document.title = (this.props.title ? `${this.props.title}  | ` : '') + DEFAULT_TITLE;
    }

    render() {
        return this.props.children;
    }
};

export const ThemeContext = React.createContext({
    isDark: false,
    toggleTheme: () => {},
  });

export default { PageTitle, ThemeContext }