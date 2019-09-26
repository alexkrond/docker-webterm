import React from "react"


class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          {JSON.stringify(this.props.info)}
        </div>
    );
  }
}

export default Session
