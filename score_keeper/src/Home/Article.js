import React from "react";

class Article extends React.Component {
  render() {
    return (
      <div className="Home_article">
        <div className="Home_articleHeader">
          <div style={{ position: "absolute", top: this.props.imageAdjust }}>
            <a href={this.props.link}>
              <img
                alt={this.props.title}
                src={this.props.image}
                style={{ width: "100vw" }}
              ></img>
            </a>
          </div>
          <div className="Home_articleTitle">
            <a href={this.props.link}>{this.props.title}</a>
          </div>
        </div>
        <div className="Home_articleDescription">{this.props.description}</div>
      </div>
    );
  }
}

export default Article;
