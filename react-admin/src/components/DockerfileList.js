import React from "react"
import Dockerfile from "./Dockerfile.js"
import Cap from "./Cap.js"


class DockerfileList extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.state = {dockerfiles: []};

    this.updateDockerfiles = this.updateDockerfiles.bind(this);
  }

  async componentDidMount() {
    await this.updateDockerfiles();
    this.interval = setInterval(this.updateDockerfiles, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async updateDockerfiles() {
    // const data = await fetch(`/shell/dockerfiles`).catch(err => console.error(err));
    // const body = await data.json();

    // this.setState({dockerfiles: body});
    this.setState({dockerfiles: ["Dockerfile_test"]});
  }

  render() {
    return (
        <div className="dockerfiles">
          <h3>Dockerfile List</h3>
          <ul className="dockerfile-list">
            {this.state.dockerfiles.length ?
                this.state.dockerfiles.map(dockerfile => <Dockerfile key={dockerfile} info={dockerfile.toLowerCase()} hostName={this.host}/>) :
                <Cap text={"Тут будут Dockerfile`ы"}/>}
          </ul>
        </div>
    );
  }
}

export default DockerfileList
