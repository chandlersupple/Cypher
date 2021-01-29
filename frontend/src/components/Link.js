import React from 'react';
import "./components.css"

class Link extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            link: this.props.link,
        };
    };

    render() {
        return (
            <div className="linkContainer">
                <span>{this.state.title}</span>
                <span className="linkLink">{this.state.link}</span>
            </div>
        )
    }
}

export default Link;