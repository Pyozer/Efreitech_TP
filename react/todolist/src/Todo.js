import React, { Component } from 'react';
import TodoList from './TodoList';

class Todo extends React.Component {
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

  onDeleteAll = () => {
    this.setState({
      items: []
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="text-center">
          <label htmlFor="new-todo">
            Add new item to TodoList
          </label>
          <br />
          <input
            id="new-todo"
            type="text"
            className="input left-round"
            placeholder="Add new todo"
            onChange={this.handleChange}
            value={this.state.text}
            required
          />
          <button type="submit" className="btn right-round">ADD</button>
        </form>
        <br />
        <TodoList items={this.state.items} onItemClick={this.onItemClick} />
        <div className="fixed-bottom-right">
          <button className="btn btn-danger round" onClick={this.onDeleteAll}>DELETE ALL</button>
        </div>
      </>
    );
  }
}

export default Todo;
