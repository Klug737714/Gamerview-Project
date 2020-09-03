import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import postsService from "../services/postsService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class EditPost extends Form {
  state = {
    data: {
      _id: "",
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

  async componentDidMount() {
    const postId = this.props.match.params.id;
    const { data } = await postsService.getPost(postId);
    this.setState({ data: this.mapToView(data) });
  }

  mapToView(post) {
    return {
      _id: post._id,
      postTitle: post.postTitle,
      postSubject: post.postSubject,
      postMessage: post.postMessage,
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    await postsService.editPost(data);
    toast("Post Edited");
    this.props.history.replace("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader title="Edit Post" description="Edit Your Post Here!" />
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
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
                  value={this.state.data["postMessage"]}
                ></textarea>
              </div>
              {this.renderButton("Edit Post")}

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

export default EditPost;
