import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import postsService from "../services/postsService";
import userService from "../services/userService";
const Post = ({ post, user, favoritePost }) => {
  return (
    <div className="col-10 post">
      <span className="title h5">{post.postTitle}</span>
      {window.location.pathname === "/my-posts" && (
        <React.Fragment>
          <Link
            className="deleteButton"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
              }).then((result) => {
                if (result.value) {
                  postsService.deletePost(post._id);
                  window.location = "/my-posts";
                }
              });
            }}
            to={`/my-posts`}
          >
            <i className="fas fa-minus-circle"></i>
          </Link>
          <Link className="editButton" to={`/my-posts/edit/${post._id}`}>
            <i className="far fa-edit"></i>
          </Link>
        </React.Fragment>
      )}
      {(window.location.pathname === "/" ||
        window.location.pathname === "/favorited") &&
        userService.getCurrentUser() && (
          <button
            className="favorite btn text-warning"
            onClick={() => {
              favoritePost(post._id);
            }}
          >
            {user.favorites && user.favorites.includes(post._id) && (
              <i className="fas fa-star"></i>
            )}
            {user.favorites && !user.favorites.includes(post._id) && (
              <i className="far fa-star"></i>
            )}
            {!user.favorites && <i className="far fa-star"></i>}
          </button>
        )}
      <br />
      <span className="message">{post.postMessage}</span>
      <span className="subject">{post.postSubject}</span>
    </div>
  );
};
export default Post;
