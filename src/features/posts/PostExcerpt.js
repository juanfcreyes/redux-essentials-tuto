import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";
import { selectPostById } from "./postsSlice";

export const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post-excerpt pd" key={post.id}>
      <h3>{post.title} </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <div className="content-right">
        <Link
          to={`/posts/${post.id}`}
          className="button muted-button redux-button"
        >
          View Post
        </Link>
        <ReactionButtons post={post} />
      </div>
      <div className="content-between">
        <div className="flex-auto content-left">
          <PostAuthor userId={post.user} />
        </div>
        <div className="flex-auto content-right">
          <TimeAgo timestamp={post.date} />
        </div>
      </div>
    </article>
  );
};
