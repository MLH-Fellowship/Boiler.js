import React from "react";
import Snackbar from "material-ui/Snackbar";
import { withSnackbar } from 'notistack';
import "./Library.css";
import { MuiThemeProvider } from "material-ui/styles";

class BoilerCard extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonFunctionComplete = this.onButtonFunctionComplete.bind(this);
    }
    
    // Function runs after git repo is successfully downloaded
    async onButtonFunctionComplete(snackbarOpen, snackbarContent, id, path, commands) {
        this.props.enqueueSnackbar(snackbarContent);
        for await (let i of commands) {
            // console.log(commands.indexOf(i));
            // console.log("Command", i);       
            let snackbarUpdate = await secondFetch(id, path, commands.indexOf(i));
            this.props.enqueueSnackbar(snackbarUpdate.message)
        }
        this.props.enqueueSnackbar('Commands finished!')
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
                    </div>
                </section>
            </article>;
        return element
    }
}

// Fetches commands
async function secondFetch(id, path, command) {
    let response = await (await fetch(`http://localhost:5000/boilers/setup/${id}/${command}/${path}`)).json();
    // console.log("Path", response.path);
    return({success: true, message: response.message, path: response.path});
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
        console.log(response.commands);
        this.props.callback(true, response.message, response.id, response.path, response.commands);
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

export default withSnackbar(BoilerCard);