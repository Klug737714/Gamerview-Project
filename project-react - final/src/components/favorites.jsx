import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import Post from "./posts";
import { getFavoritedPosts } from "../services/postsService";
import userService, { getCurrentUsername } from "../services/userService";
class Favorites extends Component {
  state = {
    posts: [],
    user: [],
  };
  componentDidMount = async () => {
    const { data } = await getFavoritedPosts();
    if (data.length > 0) {
      this.setState({ posts: data });
    }
    const user = await getCurrentUsername();
    this.setState({ user: user.data });
  };
  favoritePost = async (postId) => {
    const newUser = await userService.favorite(postId);
    this.setState({ user: newUser });
    const { data } = await getFavoritedPosts();
    if (data.length > 0) {
      this.setState({ posts: data });
    } else {
      this.setState({ posts: [] });
    }
    const user = await getCurrentUsername();
    this.setState({ user: user.data });
  };
  render() {
    const { posts, user } = this.state;
    return (
      <div className="container">
        <PageHeader title="Favorite Posts" description="Your favorited posts" />
        <div className="row">
          {posts.length > 0 &&
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                user={user}
                favoritePost={this.favoritePost}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
