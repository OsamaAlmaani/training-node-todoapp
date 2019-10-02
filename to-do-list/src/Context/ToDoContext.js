import React, { createContext, useState, useEffect } from "react";

const ToDoContext = createContext([]);

export const ToDoProvider = props => {
	const [todoItems, setTodoItems] = useState([]);

	const fetchToDos = async () => {
		const json = await fetch("http://127.0.0.1:4000/get");
		const data = await json.json();
		setTodoItems(data);
	};

	useEffect(() => {
		console.log("effect");
		fetchToDos();
	}, []);

	console.log("render");

	return <ToDoContext.Provider value={todoItems}>{props.children}</ToDoContext.Provider>;
};

export const ToDoConsumer = props => {
	return <ToDoContext.Consumer>{state => props.children(state)}</ToDoContext.Consumer>;
};
