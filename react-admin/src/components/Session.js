import React from "react"


class Session extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.info.id;
    this.state = {killed: false};

    this.killSession = this.killSession.bind(this);
  }

  async killSession() {
    const data = await fetch(`/shell/sessions/kill/${this.id}`);
    const body = await data.json();

    if (body.status === "OK") {
      this.setState({killed: true});
    }
  }

  render() {
    if (!this.state.killed) {
      return (
          <li>
            {this.id}
            <button onClick={this.killSession}>Завершить</button>
          </li>
      );
    } else {
      return null;
    }
  }
}

export default Session
