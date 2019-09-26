import React from "react"
import HostColumn from "./HostColumn.js"


class TableHosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {columns: []};
  }

  async componentDidMount() {
    const data = await fetch("/shell/hosts").catch(err => console.error(err));
    const body = await data.json();

    let columns = [];
    for (let host in body) {
      if (body.hasOwnProperty(host)) {
        columns.push(host);
      }
    }

    this.setState({columns: columns});
  }

  render() {
    return (
        <div>
          {this.state.columns.map(host => <HostColumn key={host} hostName={host} />)}
        </div>
    );
  }
}

export default TableHosts
