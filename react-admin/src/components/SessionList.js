import React from "react"
import Session from "./Session.js"
import Cap from "./Cap.js"


class SessionList extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.state = {sessions: []};
  }

  async componentDidMount() {
    const data = await fetch(`/shell/sessions?host=${this.host}`).catch(err => console.error(err));
    const body = await data.json();

    this.setState({sessions: body});
  }

  render() {
    return (
        <div style={this.style}>
          {this.state.sessions.length ? this.state.sessions.map(session => <Session key={session.id} info={session}/>) :
              <Cap text={"Тут будут сессии"}/>}
        </div>
    );
  }
}

export default SessionList
