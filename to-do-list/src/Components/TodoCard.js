import React, { Component } from "react";

class TodoCard extends Component {
	item = this.props.item;

	render() {
		return (
			<div
				key={this.item.id}
				style={{
					...styles.cardStyle,
					backgroundColor: this.item.bg
				}}>
				<img
					alt=""
					style={styles.img}
					src={
						this.item.status === 0
							? "https://cdn4.iconfinder.com/data/icons/fintech-solutions-filled-outline/24/pending_time_clock_watch_timer-512.png"
							: "https://www.worldofdogtraining.com/wp-content/uploads/2019/02/PE-Success-Icon.png"
					}
				/>
				<div>ID: {this.item.id}</div>
				<div>Description: {this.item.text}</div>
				<div>status: {this.item.status}</div>
			</div>
		);
	}
}

const styles = {
	cardStyle: {
		width: 250,
		boxShadow: "2px 2px 4px 0 rgba(0,0,0,0.2)",
		padding: 15,
		marginBottom: 15,
		border: "1px solid rgba(0,0,0,0.2)",
		position: "relative"
	},
	img: {
		width: 20,
		height: 20,
		position: "absolute",
		right: 10,
		top: 10
	}
};

export default TodoCard;
