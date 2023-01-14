import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Loader } from "../components/Loader";
import { useSignUpMutation } from "../redux/api/authApi";
import { setMessage } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks/hooks";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, { isLoading, error, isSuccess }] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    await signUp({ email, name, password });
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      dispatch(setMessage({ data: error.data, isError: true }));
    }
  }, [error]);

  return (
    <div className="p-10 flex flex-col justify-center items-center m-auto">
      <Form handleOnSubmit={handleSignUp}>
        <h2 className="text-2xl font-medium text-emerald-700">Sign Up</h2>
        <div className="flex flex-col w-full gap-1">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </div>
        <Button typeBtn="submit">{isLoading ? <Loader /> : "Submit"}</Button>
        <Link className="underline text-sm" to="/login">
          Already have an account? go to login
        </Link>
      </Form>
    </div>
  );
};
