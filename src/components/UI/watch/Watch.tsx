import React from "react";

interface State {
    currentTime: string;
}

class Watch extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentTime: new Date().toLocaleTimeString('it-IT')
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ currentTime: new Date().toLocaleTimeString('it-IT') });
        }, 1000);
    }

    render() {
        return (
            <div>
                <p className="watch-txt">{this.state.currentTime}</p>
            </div>
        );
    }
}

export default Watch;
