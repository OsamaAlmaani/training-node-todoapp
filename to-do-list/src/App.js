import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ToDoList from "./Components/TodoList";
import { ToDoProvider } from "./Context/ToDoContext";
import Header from "./Components/Header";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
			endpoint: "http://127.0.0.1:4000"
		};
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("onAdd", data => {
			this.setState({ items: [...this.state.items, data] });
		});

		socket.on("onStatusChanged", record => {
			const items = [...this.state.items];
			const indexedItems = items.map((value, index) => {
				return { ...value, index: index };
			});
			const filteredRecord = indexedItems.filter(value => value.id === record.id);
			filteredRecord.status = record.status;
			items[record.index] = record;
			this.setState({
				items: items
			});
		});
	}

	render() {
		return (
			<ToDoProvider>
				<div style={styles.pageWrapper}>
					<h5>TODO APP</h5>
					<Header />
					<ToDoList />
				</div>
			</ToDoProvider>
		);
	}
}

const styles = {
	pageWrapper: {
		margin: 30
	}
};
