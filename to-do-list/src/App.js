import React, { Component } from "react";
import socketIOClient from "socket.io-client";

export default class App extends Component {
    cardStyle = {
        width: "300px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        padding: "15px",
        margin: "15px"
    };

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

        // Get All items on load
        fetch(this.state.endpoint + "/get")
            .then(res => res.json())
            .then(data => this.setState({ items: data }));
    }
 
    render() {
        return (
            <div>
                {this.state.items.map(item => (
                    <div key={item.id} style={this.cardStyle}>
                        {item.status === 0 ? (
                            <img style={{width: 20, height: 20}} src="https://cdn4.iconfinder.com/data/icons/fintech-solutions-filled-outline/24/pending_time_clock_watch_timer-512.png" />
                        ) : (
                            <img style={{width: 20, height: 20}} src="https://www.worldofdogtraining.com/wp-content/uploads/2019/02/PE-Success-Icon.png" />
                        )}
                        <div>Number: {item.id}</div>
                        <div>Description: {item.text}</div>
                        <div>status: {item.status}</div>
                    </div>
                ))}
            </div>
        );
    }
}
