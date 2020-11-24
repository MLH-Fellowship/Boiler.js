import { Component } from "react";
import "./Library.css";

class BoilerHeader extends Component {
  render() {
    return (
      <header className="boiler-header">
        <h1>Boiler.js <span className="subtitle">Template Library</span></h1>
      </header>
    )
  }
}

export default BoilerHeader;