import React from "react"
import Container from "./Container.js"
import Cap from "./Cap.js"


class ContainersList extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.state = {containers: []};

    this.updateContainers = this.updateContainers.bind(this);
  }

  async componentDidMount() {
    await this.updateContainers();
    this.interval = setInterval(this.updateContainers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async updateContainers() {
    const data = await fetch(`/shell/containers?host=${this.host}`).catch(err => console.error(err));
    const body = await data.json();

    this.setState({containers: body});
  }

  render() {
    return (
        <div className="containers">
          <h3>Container List</h3>
          <ul className="container-list">
            {this.state.containers.length ?
                this.state.containers.map(cont => <Container key={cont.CONTAINER_ID} info={cont} hostName={this.host}/>) :
                <Cap text={"Тут будут запущенные контейнеры"}/>}
          </ul>
        </div>
    );
  }
}

export default ContainersList
