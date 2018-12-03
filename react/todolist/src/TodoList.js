import React from 'react'
import './css/todolist.css'

const TodoList = ({ items, onItemClick }) => (
    <div className="todo-list">
        {items.map(item => (
            <div key={item.id} onClick={() => onItemClick(item.id)}>{item.text}</div>
        ))}
    </div>
)

export default TodoList