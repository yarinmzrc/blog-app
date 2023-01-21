import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { selectAuth, setMessage } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { formatDate } from "../utils";
import { defaultImageSrc, modalCustomStyles } from "../constants/constants";
import { Comment, Button, EditForm, Loader } from "../components";
import {
  useAddCommentMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../redux/api/postApi";

const defaultEditForm = {
  title: "",
  body: "",
  image: "",
};

export const Post = () => {
  const { postId } = useParams();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { isLoading, data, isError, error } = useGetPostQuery(postId || "");
  const [updatePost, { isLoading: isEditing }] = useUpdatePostMutation();
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [comment, setComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editFormInfo, setEditFormInfo] = useState(defaultEditForm);

  useEffect(() => {
    if (isError && error && "data" in error) {
      dispatch(setMessage({ data: error.data, isError: true }));
    }
  }, [error, isError]);

  useEffect(() => {
    if (data) {
      const { title, body, image } = data.post;
      setEditFormInfo({
        ...editFormInfo,
        title,
        body,
        image,
      });
    }
  }, [data]);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (postId) {
        await addComment({
          text: comment,
          postId,
          userId: user?._id || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
    setComment("");
  };

  const setEditButtonIfUser =
    user && user._id === data?.post?.userId._id ? (
      <Button typeBtn="" handleClick={() => setModalIsOpen(true)}>
        Edit
      </Button>
    ) : (
      ""
    );

  return isLoading || isEditing ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex flex-col gap-8 py-10 px-40">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{data?.post?.title}</h1>
        {setEditButtonIfUser}
      </div>
      <div className="flex gap-8 text-sm text-gray-500">
        <p>{data?.post?.userId.name}</p>
        <p>{data?.post?.category}</p>
        <p>{formatDate(data?.post?.createdAt || "")}</p>
      </div>
      <img
        className="max-w-xl object-cover rounded-r-lg"
        src={data?.post?.image || defaultImageSrc}
        alt="blog post"
      />
      <section className="leading-loose">{data?.post?.body}</section>
      <section>
        <h2 className="text-lg font-bold">Comments</h2>
        <div className="p-6">
          <h3>Leave a comment</h3>
          <form onSubmit={handleAddComment}>
            <input
              value={comment}
              placeholder="Comment"
              className="bg-white border text-gray-500 tracking-wide text-sm rounded-xl p-3 w-full !outline-none"
              type="text"
              id=""
              onChange={(e) => setComment((e.target as HTMLInputElement).value)}
            />
            <Button typeBtn="submit">Submit</Button>
          </form>
        </div>
        <div className="flex flex-col gap-4 mt-3">
          {data?.comments.map((comment) => (
            <Comment {...comment} key={comment._id} />
          ))}
        </div>
      </section>
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
