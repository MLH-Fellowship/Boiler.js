import { Component } from "react";
import "./Library.css";

class Card extends Component {
    render() {
        let element = <article className="boiler-card">
            <header>
                <h2>{this.props.title}</h2>
                <aside>Tags: {this.props.tags.join(", ")}</aside>
            </header>
            <section className="card-body">
                <h3>{this.props.tagline}</h3>
                <p>{this.props.body}</p>
                <FavoriteButton link={ this.props.url }></FavoriteButton>
                <DeployButton link={ this.props.url }></DeployButton>
                <DownloadButton link={ this.props.url }></DownloadButton>
            </section>
        </article>;
        return element
    }
}

class FavoriteButton extends Component {
    favoriteLink(name, event) {
        console.log("Favorited", name);
    }
    render() {
        return <button onClick={(e) => this.favoriteLink(this.props.link, e)}>Favorite</button>;
    }
}

class DeployButton extends Component {
    deployLink(name, event) {
        console.log("Deploy", name);
    }
    render() {
        return <button onClick={(e) => this.deployLink(this.props.link, e)}>Deploy</button>;
    }
}

class DownloadButton extends Component {
    downloadLink(name, event) {
        console.log("Download", name);
    }
    render() {
        return <button onClick={(e) => this.downloadLink(this.props.link, e)}>Download</button>;
    }
}

export {Card, DeployButton, FavoriteButton};