import { Component } from "react";
import "./Library.css";

class BoilerGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boilers: []
        };
        this.refreshBoilers();
    }

    async refreshBoilers() {
        await fetch('http://localhost:5000/boilers').then(res => res.json()).then(json => this.setState({boilers: json}))
    }

    render() {
        return (
            <div className="boiler-card-gallery">
                {this.state.boilers.map((boiler, key) => <BoilerCard key={key} {...boiler}></BoilerCard>)}
            </div>
        );
    }
}

class BoilerCard extends Component {
    render() {
        let element = <article className="boiler-card">
            <header>
                <h2>{this.props.name}</h2>
                <aside>Type: {this.props.type}</aside>
            </header>
            <section className="card-body">
                <h3>{this.props.repo}</h3>
                <p>{this.props.body}</p>
                <FavoriteButton id={ this.props._id }></FavoriteButton>
                <DeployButton id={ this.props._id }></DeployButton>
                <DownloadButton id={ this.props._id }></DownloadButton>
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
        return <button onClick={(e) => this.favoriteLink(this.props.id, e)}>Favorite</button>;
    }
}

class DeployButton extends Component {
    deployLink(name, event) {
        console.log("Deploy", name);
    }
    render() {
        return <button onClick={(e) => this.deployLink(this.props.id, e)}>Deploy</button>;
    }
}

class DownloadButton extends Component {
    downloadLink(name, event) {
        console.log("Download", name);
    }
    render() {
        return <button onClick={(e) => this.downloadLink(this.props.id, e)}>Download</button>;
    }
}

export {BoilerGallery, BoilerCard, DeployButton, FavoriteButton};