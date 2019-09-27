import React from "react"


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.id = this.props.info.CONTAINER_ID;
    this.state = {killed: false};

    this.killContainer = this.killContainer.bind(this);
    this.containerAttach = this.containerAttach.bind(this);

    this.info = [];
    for (let i in this.props.info) {
      if (this.props.info.hasOwnProperty(i)) {
        this.info.push(
            <li key={i}>
              {i}: {this.props.info[i]}
            </li>
        );
      }
    }
  }

  async killContainer() {
    const data = await fetch(`/shell/containers/kill/${this.id}?host=${this.host}`);
    const body = await data.json();

    if (body.status === "OK") {
      this.setState({killed: true});
    }
  }

  containerAttach() {
    window.open(`/shell/containers/attach/${this.id}?host=${this.host}`);
  }

  render() {
    if (!this.state.killed) {
      return (
          <li>
            <button onClick={this.containerAttach}>Подключиться</button>
            <button onClick={this.killContainer}>Убить</button>
            <ul>
              {this.info}
            </ul>
          </li>
      );
    } else {
      return null;
    }
  }
}

export default Container
