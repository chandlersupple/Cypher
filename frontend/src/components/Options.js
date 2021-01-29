import React from 'react';
import "./components.css"
import Link from "./Link.js"

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="outerContainer">
                <span id="optionsTitle">Top Questions</span>
                <span id="moreButton">See more</span>
            </div>
        )
    }
}

export default Options;