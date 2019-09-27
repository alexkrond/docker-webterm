import React from "react"
import SessionList from "./SessionList.js"
import ContainersList from "./ContainersList.js"
import ImageList from "./ImageList.js"
import DockerfileList from "./DockerfileList.js"


class HostColumn extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.style = {
      display: "inline-block"
    };
  }

  render() {
    return (
        <div style={this.style}>
          <SessionList hostName={this.host} />
          <ContainersList hostName={this.host} />
          <ImageList hostName={this.host} />
          <DockerfileList hostName={this.host} />
        </div>
    );
  }
}

export default HostColumn
