import React from "react"
import Image from "./Image.js"
import Cap from "./Cap.js"


class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.host = this.props.hostName;
    this.state = {images: []};

    this.updateImages = this.updateImages.bind(this);
  }

  async componentDidMount() {
    await this.updateImages();
    this.interval = setInterval(this.updateImages, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async updateImages() {
    const data = await fetch(`/shell/images?host=${this.host}`).catch(err => console.error(err));
    const body = await data.json();

    this.setState({images: body});
  }

  render() {
    return (
        <div className="images">
          <h3>Image List</h3>
          <ul className="image-list">
            {this.state.images.length ?
                this.state.images.map(image => <Image key={image.REPOSITORY + image.TAG} info={image} hostName={this.host}/>) :
                <Cap text={"Тут будут образы"}/>}
          </ul>
        </div>
    );
  }
}

export default ImageList
