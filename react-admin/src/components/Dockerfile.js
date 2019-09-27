import React from "react"


class Dockerfile extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.name = this.props.info;

    this.buildImage = this.buildImage.bind(this);
  }

  buildImage() {
    window.open(`/shell/images/build/${this.name}?host=${this.host}`);
  }

  render() {
    return (
        <li>
          {this.name}
          <button onClick={this.buildImage}>Собрать</button>
        </li>
    );
  }
}

export default Dockerfile
