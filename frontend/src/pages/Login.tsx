import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectAuth, setUser } from "../redux/features/authSlice";
import { useLoginMutation } from "../redux/api/authApi";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading, data, isSuccess, error }] = useLoginMutation();
  const { user } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginResult = await login({ email, password });
      if ("error" in loginResult) {
        throw loginResult.error;
      }
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.token && data.user) {
        dispatch(setUser({ user: data?.user, token: data?.token }));
        navigate("/dashboard");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (error && "data" in error) {
      setErrorMessage(error.data as string);
    }
  }, [error]);

  return (
    <div className="p-10 flex flex-col justify-center items-center m-auto">
      <Form handleOnSubmit={handleLogin}>
        <h2 className="text-2xl font-medium text-emerald-700">Login</h2>
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
        <p>{errorMessage}</p>
        <Button>{isLoading ? <Loader /> : "Submit"}</Button>
        <Link className="underline text-sm" to="/sign-up">
          Don&apos;t have an account? go to sign up.
        </Link>
      </Form>
    </div>
  );
};
