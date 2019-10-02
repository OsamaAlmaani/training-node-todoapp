import React from "react";
import { ToDoConsumer } from "../Context/ToDoContext";

export default function Header() {
	return (
		<ToDoConsumer>
			{todoItems => (
				<label style={{ marginBottom: 10, display: "block" }}>
					TODO Items Count = {todoItems.length}
				</label>
			)}
		</ToDoConsumer>
	);
}
