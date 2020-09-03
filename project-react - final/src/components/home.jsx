import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import postsService, { getSearchPosts } from "../services/postsService";
import Post from "./posts";
import userService from "../services/userService";
class Home extends Component {
  state = {
    posts: [],
    search: "",
    user: [],
  };
  componentDidUpdate() {
    if (this.state.search && this.state.search !== this.props.location.search) {
      this.componentDidMount();
    }
  }
  async componentDidMount() {
    if (this.state.user !== [] && (await userService.getCurrentUser())) {
      const user = await userService.getCurrentUsername();
      this.setState({ user: user.data });
    }
    if (this.props.location.search) {
      const { data } = await getSearchPosts(
        this.props.location.search.substring(
          this.props.location.search.indexOf("=") + 1
        )
      );
      this.setState({ posts: data.reverse() });
      this.setState({ search: this.props.location.search });
    } else {
      const { data } = await postsService.getAllPosts();
      this.setState({ posts: data.reverse() });
    }
  }
  favoritePost = async (postId) => {
    const newUser = await userService.favorite(postId);
    this.setState({ user: newUser });
    const user = await userService.getCurrentUsername();
    this.setState({ user: user.data });
  };
  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <PageHeader
          title="The Gamer View"
          description="Welcome to The Gamer View! The place to discuss video games!"
        />
        <br />
        <div className="row">
          <div className="col-12 text-center">
            <h3>"The gamer's headquarters"</h3>
          </div>
        </div>
        {
          <div className="row center">
            {posts.length > 0 &&
              posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  user={this.state.user}
                  favoritePost={this.favoritePost}
                />
              ))}
            {posts.length < 1 && <p>No Posts Available</p>}
          </div>
        }
      </div>
    );
  }
}
export default Home;
