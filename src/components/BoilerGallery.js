import { Component } from "react";
import BoilerCard from "./BoilerCard"
import "./Library.css";

class BoilerGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boilers: this.props.values
    };
  }

  render() {
    return (
      <div className="boiler-card-gallery">
        {console.log(this.props.values)}
        {this.props.values.map((boiler, key) => <BoilerCard key={key} {...boiler} />)}
      </div>
    );
  }
}

export default BoilerGallery;