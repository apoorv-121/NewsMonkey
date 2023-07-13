import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    let defaultUrl = "https://i.stack.imgur.com/l60Hf.png";
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
          <img
            src={imageUrl ? imageUrl : defaultUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 40) : ""}...</h5>

            <p className="card-text">
              {description ? description.slice(0, 90) : ""}...
            </p>
            <p className="card-text text-success">
              <small className=" text-danger">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
