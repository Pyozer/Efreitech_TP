import React, { Component } from 'react';
import TodoList from './TodoList';
import './css/todoapp.css'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text.length) return

    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  onItemClick = (id) => {
    this.setState(state => ({
      items: state.items.filter(value => value.id != id)
    }))
  }

  render() {
    return (
      <div className="centered">
        <h1>TODO</h1>
        <form onSubmit={this.handleSubmit} className="text-center">
          <label htmlFor="new-todo">
            Add new item to TodoList
          </label>
          <br />
          <input
            id="new-todo"
            type="text"
            className="input"
            placeholder="Add new todo"
            onChange={this.handleChange}
            value={this.state.text}
            style={{ marginTop: 16 }}
            required
          />
          <button type="submit" className="btn">ADD</button>
        </form>
        <br />
        <TodoList items={this.state.items} onItemClick={this.onItemClick} />
      </div>
    );
  }
}

export default TodoApp;
