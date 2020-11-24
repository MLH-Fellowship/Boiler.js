import React from "react";
import "./Library.css";

class BoilerCard extends React.Component {
    render() {
        let element =
            <article className="boiler-card">
                <header>
                    <p className="card-title">{this.props.name}</p>
                    <p className="card-subtitle">{this.props.type}</p>
                </header>
                <section className="card-body">
                    <span>{this.props.description}</span>
                    <p>{this.props.body}</p>
                    <FavoriteButton id={this.props._id}></FavoriteButton>
                    <DeployButton id={this.props._id}></DeployButton>
                    {/* <DownloadButton id={ this.props._id }></DownloadButton> */}
                </section>
            </article>;
        return element
    }
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
    deployLink(id, event) {
        console.log("Deploying", id);
        fetch(`http://localhost:5000/boilers/deploy/${id}`)
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