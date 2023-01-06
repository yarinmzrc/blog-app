import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectAuth, setUser } from "../redux/features/authSlice";
import { useLoginMutation } from "../redux/api/authApi";
import { Loader } from "../components/Loader";
import { Button } from "../components/Button";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, { isLoading, data, isSuccess }] = useLoginMutation();
  const { user } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
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

  return isLoading ? (
    <Loader />
  ) : (
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
        <Button buttonText="Submit" />
        <Link className="underline text-sm" to="/sign-up">
          Don&apos;t have an account? go to sign up.
        </Link>
      </Form>
    </div>
  );
};
