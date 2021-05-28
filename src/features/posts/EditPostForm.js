import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { postUpdated, selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const [values, onChangeHandle] = useForm(post);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSavePostClicked = () => {
    if (values.title && values.content) {
      dispatch(postUpdated({ ...values }));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="What's on your mind?"
          value={values.title}
          onChange={onChangeHandle}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={onChangeHandle}
        />
      </form>
      <button
        type="button"
        className="redux-button"
        onClick={onSavePostClicked}
      >
        Save Post
      </button>
    </section>
  );
};
