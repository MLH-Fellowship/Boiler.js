import { Component } from "react";
import Snackbar from "material-ui/Snackbar";
import "./Library.css";

class BoilerHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: " ",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }
  render() {
    return (
      <>
        <header className="boiler-header">
          <h1>
            Boiler.js <span className="subtitle">Template Library</span>
          </h1>

          <form>
            <input
              type="text"
              id="search"
              name="search"
              onChange={this.onChange}
              placeholder="ex. React, Flask, Angular..."
            ></input>
          </form>
        </header>

        <BoilerGallery query={this.state.search} />
      </>
    );
  }
}

class BoilerGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boilers: [],
      search: "",
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.state.search) {
      this.setState({ search: nextProps.query });
      console.log(this.props);
      var api = this.props.query;
      if (api === undefined || api === "")
        api = "http://localhost:5000/boilers/query/ /";
      else api = `http://localhost:5000/boilers/query/${this.props.query}/`;

      await fetch(api)
        .then((res) => res.json())
        .then((json) => this.setState({ boilers: json }));
    }
  }

  render() {
    return (
      <div className="boiler-card-gallery">
        {this.state.boilers.map((boiler, key) => (
          <BoilerCard key={key} {...boiler}></BoilerCard>
        ))}
      </div>
    );
  }
}

class BoilerCard extends Component {
    constructor(props) {
        super(props);
     state = { snackbarOpen: false, snackbarContent: {}};
    }
     
     onButtonFunctionComplete = (snackbarOpen, snackbarContent) => {
         console.log("Snackbar:", snackbarOpen, "SnackbarContent:", snackbarContent);
         this.setState({snackbarOpen: snackbarOpen, snackbarContent: snackbarContent});
     };

  render() {
    let element = (
      <article className="boiler-card">
        <header>
          <p className="card-title">{this.props.name}</p>
          <p className="card-subtitle">{this.props.type}</p>
        </header>
        <section className="card-body">
          <span>{this.props.description}</span>
          <p>{this.props.body}</p>
          <Snackbar open={this.state.snackbarOpen} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} autoHideDuration={6000} message= {this.state.snackbarContent.message}></Snackbar>
          <FavoriteButton id={this.props._id}></FavoriteButton>
          <DeployButton callback={this.onButtonFunctionComplete} id={this.props._id}></DeployButton>
          {/* <DownloadButton id={ this.props._id }></DownloadButton> */}
        </section>
      </article>
    );
    return element;
  }
}

class FavoriteButton extends Component {
  favoriteLink(name, event) {
    console.log("Favorited", name);
  }
  render() {
    return (
      <button onClick={(e) => this.favoriteLink(this.props.id, e)}>
        Favorite
      </button>
    );
  }
}

class DeployButton extends Component {
  async deployLink(id, event) {
    let response = await fetch(`http://localhost:5000/boilers/deploy/${id}`);
    // console.log(status, message);
    this.props.callback(true, response);
  }
  render() {
    return (
      <button onClick={(e) => this.deployLink(this.props.id, e)}>Deploy</button>
    );
  }
}

class DownloadButton extends Component {
  downloadLink(name, event) {
    console.log("Download", name);
  }
  render() {
    return (
      <button onClick={(e) => this.downloadLink(this.props.id, e)}>
        Download
      </button>
    );
  }
}

export {
  BoilerGallery,
  BoilerCard,
  DeployButton,
  FavoriteButton,
  BoilerHeader,
};
