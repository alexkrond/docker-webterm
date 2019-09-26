import React from "react"
import HostColumn from "./HostColumn.js"


class TableHosts extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (async () => {
      const data = await fetch("/shell/hosts").catch(err => console.error(err));
      const body = await data.json();

      this.column = [];
      for (let host in body) {
        if (body.hasOwnProperty(host)) {
          this.column.push(<HostColumn hostName={host} />);
        }
      }
    })();
  }

  render() {
    return (
        <div>
          {this.hosts}
        </div>
    );
  }
}

export default TableHosts
