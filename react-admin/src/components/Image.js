import React from "react"


class Image extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.name = this.props.info.REPOSITORY;

    this.runContainer = this.runContainer.bind(this);
    this.runAndAttachContainer = this.runAndAttachContainer.bind(this);

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

  async runContainer() {
    const data = await fetch(`/shell/containers/run/${this.name}?host=localhost`);
    const body = await data.json();

    if (body.status === "OK") {
      return body.id;
    } else {
      return null;
    }
  }

  async runAndAttachContainer() {
    const containerID = await this.runContainer();
    if (containerID) {
      window.open(`/shell/containers/attach/${containerID}?host=${this.host}`);
    }
  }


  render() {
    return (
        <li>
          <button onClick={this.runContainer}>Запустить</button>
          <button onClick={this.runAndAttachContainer}>Запустить и подключиться</button>
          <ul>
            {this.info}
          </ul>
        </li>
    );
  }
}

export default Image
