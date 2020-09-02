import React from "react";
const Post = ({ post }) => {
  return (
    <div className="col-10 post">
      <span className="title h5">{post.postTitle}</span>
      <br />
      <span className="message">{post.postMessage}</span>
      <span className="subject">{post.postSubject}</span>
    </div>
  );
};
export default Post;
