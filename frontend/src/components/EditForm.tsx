import { FormEvent } from "react";
import { Form } from "../components/Form";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Loader } from "./Loader";

interface TEditFormInfo {
  title: string;
  body: string;
}

interface EditFormProps {
  editFormInfo: TEditFormInfo;
  handleEditForm: (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => void;
  handleSendEdit: () => void;
  isLoading: boolean;
}

export const EditForm = ({
  editFormInfo,
  handleEditForm,
  handleSendEdit,
  isLoading,
}: EditFormProps) => {
  return (
    <Form styles="w-full h-full p-6" handleOnSubmit={handleSendEdit}>
      <h2 className="text-2xl font-medium text-emerald-700">Edit</h2>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="title">Title</Label>
        <Input
          type="title"
          id="title"
          placeholder="Title"
          value={editFormInfo.title || ""}
          onChange={(e) => handleEditForm(e, "title")}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <Label htmlFor="password">Body</Label>
        <textarea
          id="body"
          rows={8}
          className="bg-white border text-gray-500 tracking-wide text-sm rounded-xl p-3 !outline-none"
          placeholder="Body"
          value={editFormInfo.body}
          onChange={(e) => handleEditForm(e, "title")}
        />
      </div>
      <Button>{isLoading ? <Loader /> : "Submit"}</Button>
    </Form>
  );
};
