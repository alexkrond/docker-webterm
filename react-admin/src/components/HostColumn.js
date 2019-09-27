import React from "react"
import SessionList from "./SessionList.js"
import ContainersList from "./ContainersList.js"
import ImageList from "./ImageList.js"
import DockerfileList from "./DockerfileList.js"


class HostColumn extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.host.hostName;
    this.style = {
      minWidth: "300px",
      padding: "30px",
      border: "1px solid"
    };
  }

  render() {
    return (
        <div style={this.style}>
          <div>
            <h3>{this.props.host.host}</h3>
            <p>{this.props.host.url}</p>
          </div>
          <SessionList hostName={this.host} />
          <ContainersList hostName={this.host} />
          <ImageList hostName={this.host} />
          <DockerfileList hostName={this.host} />
        </div>
    );
  }
}

export default HostColumn
