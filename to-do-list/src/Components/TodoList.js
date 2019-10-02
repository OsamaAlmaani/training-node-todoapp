import React from "react";
import TodoCard from "./TodoCard";
import { ToDoConsumer } from "../Context/ToDoContext";

export default () => {
	return (
		<ToDoConsumer>
			{todoItems => todoItems.map((item, index) => <TodoCard key={item.id} item={item} />)}
		</ToDoConsumer>
	);
};
