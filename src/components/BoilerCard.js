import React from "react";
import Snackbar from "material-ui/Snackbar";
import "./Library.css";
import { MuiThemeProvider } from "material-ui/styles";

class BoilerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { snackbarOpen: false, snackbarContent: ''};
        this.onButtonFunctionComplete = this.onButtonFunctionComplete.bind(this);
        this.updateSnackbar = this.updateSnackbar.bind(this);
    }
    
    // Function runs after git repo is successfully downloaded
    async onButtonFunctionComplete(snackbarOpen, snackbarContent, id) {
        this.updateSnackbar(snackbarOpen, snackbarContent);
        let snackbarUpdate = await secondFetch(id);
        this.updateSnackbar(false, " ");
        this.updateSnackbar(true, snackbarUpdate.message);
        console.log("Checking");
     };
    
    // Updates snackbar message
    updateSnackbar = (snackbarOpen, snackbarContent) => {
        console.log("Snackbar:", snackbarOpen, "SnackbarContent:", snackbarContent);
        this.setState({snackbarOpen: snackbarOpen, snackbarContent: snackbarContent});
    };

    render() {
        let element =
            <article className="boiler-card">
                <header>
                    <p className="card-title">{this.props.name}</p>
                    <p className="card-subtitle">{this.props.type}</p>
                </header>
                <section className="card-body">
                    <p>{this.props.description}</p>
                    <div className="card-button-array">
                        <FavoriteButton id={this.props._id}></FavoriteButton>
                        <DeployButton callback={this.onButtonFunctionComplete} id={this.props._id}></DeployButton>
                        {/* <DownloadButton id={ this.props._id }></DownloadButton> */}
                    </div>
                </section>
                <MuiThemeProvider>
                        <Snackbar open={this.state.snackbarOpen} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} autoHideDuration={6000} message= {this.state.snackbarContent}></Snackbar>
                </MuiThemeProvider>
            </article>;
        return element
    }
}

// Fetches commands
async function secondFetch(id) {
    console.log("Test");
    let response = await (await fetch(`http://localhost:5000/boilers/setup/${id}`)).json();
    return({success: true, message: response.message});
    }

class FavoriteButton extends React.Component {
    favoriteLink(name, event) {
        console.log("Favorited", name);
    }
    render() {
        return <button onClick={(e) => this.favoriteLink(this.props.id, e)}>Favorite</button>;
    }
}

class DeployButton extends React.Component {
    async deployLink(id, event) {
        let response = await (await fetch(`http://localhost:5000/boilers/deploy/${id}`)).json();
        console.log("Hi");
        // let response = await (await fetch(`http://localhost:5000/boilers/setup/${id}`)).json();
        console.log("Response");
        // console.log("Deploying", id);
        // fetch(`http://localhost:5000/boilers/deploy/${id}`)
        this.props.callback(true, response.message, id);
    }
    render() {
        return <button onClick={(e) => this.deployLink(this.props.id, e)}>Clone from GitHub</button>;
    }
}

class DownloadButton extends React.Component {
    downloadLink(name, event) {
        console.log("Download", name);
    }
    render() {
        return <button onClick={(e) => this.downloadLink(this.props.id, e)}>Download</button>;
    }
}

export default BoilerCard;