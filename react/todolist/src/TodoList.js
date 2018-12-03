import React from 'react'
import './css/todolist.css'

const TodoList = ({ items, onItemClick }) => (
    <div className="todo-list">
        {items.length === 0 ? (
            <p className="text-center">There is no todo :/</p>
        ) : items.map(item => (
            <div key={item.id} onClick={() => onItemClick(item.id)}>{item.text}</div>
        ))}
    </div>
)

export default TodoList