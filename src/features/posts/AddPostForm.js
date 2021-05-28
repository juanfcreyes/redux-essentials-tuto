import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { unwrapResult } from "@reduxjs/toolkit";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "./../users/usersSlice";

export const AddPostForm = () => {
  const initialState = {
    title: "",
    content: "",
    user: ""
  };

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector((state) => selectAllUsers(state));
  const [formState, onChangeHandle, setFormValues] = useForm(initialState);
  const dispatch = useDispatch();

  const onClickSubmit = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        console.log("formState.value", formState);
        const resultAction = await dispatch(addNewPost(formState));
        unwrapResult(resultAction);
        setFormValues(initialState);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave =
    [formState.title, formState.content, formState.user].every(Boolean) &&
    addRequestStatus === "idle";

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onClickSubmit}>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formState.title}
          placeholder="What's on your mind?"
          onChange={onChangeHandle}
        />
        <label htmlFor="user">Author:</label>
        <select
          id="user"
          name="user"
          value={formState.user}
          onChange={onChangeHandle}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formState.content}
          onChange={onChangeHandle}
        />
        <button
          onClick={onClickSubmit}
          className="redux-button"
          type="button"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
