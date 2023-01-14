import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useGetPostQuery, useUpdatePostMutation } from "../redux/api/postApi";
import { selectAuth, setMessage } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { formatDate } from "../utils";
import Modal from "react-modal";
import { EditForm } from "../components/EditForm";
import { defaultImageSrc, modalCustomStyles } from "../constants/constants";

export const Post = () => {
  const { postId } = useParams();
  const {
    isLoading,
    data: post,
    isError,
    error,
  } = useGetPostQuery(postId || "");
  const [updatePost, { isLoading: isEditing, data: editData }] =
    useUpdatePostMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editFormInfo, setEditFormInfo] = useState({
    title: "",
    body: "",
    image: "",
  });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setMessage({ data: error.data, isError: true }));
    }
  }, [error, isError]);

  useEffect(() => {
    if (post) {
      setEditFormInfo({
        ...editFormInfo,
        title: post.title,
        body: post.body,
        image: post.image,
      });
    }
  }, [post]);

  const handleEditForm = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    setEditFormInfo({
      ...editFormInfo,
      [id]: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
    });
  };

  const handleSendEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (postId) {
        await updatePost({
          ...editFormInfo,
          postId,
        }).unwrap();
        setModalIsOpen(false);
        console.log(editData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading || isEditing ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex flex-col gap-10 py-10 px-40">
      <div className="flex justify-between">
        <div className="flex gap-8">
          <p>{post?.userId.name}</p>
          <p>{post?.category}</p>
          <p>{formatDate(post?.createdAt || "")}</p>
        </div>
        {user && user._id === post?.userId._id ? (
          <button onClick={() => setModalIsOpen(true)}>Edit</button>
        ) : (
          ""
        )}
      </div>
      <h1 className="text-4xl font-bold">{post?.title}</h1>
      <img
        className="max-w-xl object-cover rounded-r-lg"
        src={post?.image || defaultImageSrc}
        alt="blog post"
      />
      <section>{post?.body}</section>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalCustomStyles}
      >
        <EditForm
          handleEditForm={handleEditForm}
          handleSendEdit={handleSendEdit}
          isLoading={isLoading}
          editFormInfo={editFormInfo}
        />
      </Modal>
    </div>
  );
};
