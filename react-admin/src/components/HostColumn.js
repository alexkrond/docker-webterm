import React from "react"


class HostColumn extends React.Component{
  render() {
    return (
        <h1>{this.props.hostName}</h1>
    );
  }
}

export default HostColumn
