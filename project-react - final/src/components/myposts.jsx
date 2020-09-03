import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import Post from "./posts";
import postsService from "../services/postsService";
import { getCurrentUsername } from "../services/userService";
import { Link } from "react-router-dom";

class MyPosts extends Component {
  state = {
    posts: [],
    user: [],
  };

  async componentDidMount() {
    const { data } = await postsService.getMyPosts();
    if (data.length > 0) {
      this.setState({ posts: data });
    }
    const user = await getCurrentUsername();
    this.setState({ user: user.data });
  }

  render() {
    const { posts, user } = this.state;
    return (
      <div className="container">
        <PageHeader title={user.name} description="Posts made by you" />
        <div className="row">
          <div className="col-12">
            <Link to="/create-post">
              <i className="fas fa-plus-circle mr-2" />
              Create New Post
            </Link>
          </div>
        </div>
        <div className="row">
          {posts.length > 0 &&
            posts.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
        </div>
      </div>
    );
  }
}

export default MyPosts;
