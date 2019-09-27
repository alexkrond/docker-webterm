import React from "react"
import HostColumn from "./HostColumn.js"


class TableHosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hosts: []};

    this.style = {
      display: "flex"
    };
  }

  async componentDidMount() {
    const data = await fetch("/shell/hosts").catch(err => console.error(err));
    const body = await data.json();

    let hosts = [];
    for (let hostName in body) {
      if (body.hasOwnProperty(hostName)) {
        hosts.push({hostName: hostName, host: body[hostName].name, url: body[hostName].url});
      }
    }

    this.setState({hosts: hosts});
  }

  render() {
    return (
        <div style={this.style}>
          {this.state.hosts.map(host => <HostColumn key={host.hostName} host={host} />)}
        </div>
    );
  }
}

export default TableHosts
