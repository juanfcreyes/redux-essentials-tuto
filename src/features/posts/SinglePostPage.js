import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./postsSlice";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post pd">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div>
          <PostAuthor userId={post.user} />
        </div>
        <div>
          <TimeAgo timestamp={post.date} />
        </div>

        <div className="content-between mt">
          <div className="flex-auto content-left">
            <ReactionButtons post={post} />
          </div>
          <div className="flex-auto content-right">
            <Link to={`/editPost/${post.id}`} className="button redux-button">
              Edit Post
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
};
