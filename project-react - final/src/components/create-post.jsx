import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import postsService from "../services/postsService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class CreatePost extends Form {
  state = {
    data: {
      postTitle: "",
      postSubject: "",
      postMessage: "",
    },
    errors: {},
  };

  schema = {
    postTitle: Joi.string().min(2).max(255).required(),
    postSubject: Joi.string().min(2).max(255).required(),
    postMessage: Joi.string().min(1).max(2048).required(),
  };

  doSubmit = async () => {
    await postsService.createPost(this.state.data);
    toast("A new post was made");
    this.props.history.replace("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader title="Create Post Page" description="Post Something!" />
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form
              onSubmit={this.handleSubmit}
              method="POST"
              className="mt-4"
              autoComplete="off"
              id="postForm"
            >
              {this.renderInput("postTitle", "Title")}
              {this.renderInput("postSubject", "Subject")}
              <div className="form-group">
                <label htmlFor="postMessage">Message</label>
                <br />
                <textarea
                  onChange={this.handleChange}
                  name="postMessage"
                  id="postMessage"
                  form="postForm"
                  className="form-control"
                ></textarea>
              </div>
              {this.renderButton("Create Post")}

              <Link className="btn btn-light ml-2" to="/my-posts">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
