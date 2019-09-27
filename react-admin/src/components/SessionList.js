import React from "react"
import Session from "./Session.js"
import Cap from "./Cap.js"


class SessionList extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.state = {sessions: []};

    this.updateSessions = this.updateSessions.bind(this);
  }

  async componentDidMount() {
    await this.updateSessions();
    this.interval = setInterval(this.updateSessions, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async updateSessions() {
    const data = await fetch(`/shell/sessions?host=${this.host}`).catch(err => console.error(err));
    const body = await data.json();

    this.setState({sessions: body});
  }

  render() {
    return (
        <div className="sessions">
          <h3>Session List</h3>
          <ul className="session-list">
            {this.state.sessions.length ?
                this.state.sessions.map(session => <Session key={session.id} info={session}/>) :
                <Cap text={"Тут будут сессии"}/>}
          </ul>
        </div>
    );
  }
}

export default SessionList
