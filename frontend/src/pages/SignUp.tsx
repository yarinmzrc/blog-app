import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { useSignUpMutation } from "../redux/reducers/authApi";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, { error, isSuccess }] = useSignUpMutation();
  const navigate = useNavigate();

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
    if (error) {
      alert(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="p-10 flex flex-col justify-center items-center m-auto">
      <Form handleOnSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold">Sign Up</h2>
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
        <button
          type="submit"
          className="inline-block px-8 py-3 mt-3 border-2 border-grey-800 text-grey-800 font-medium text-xs leading-tight uppercase rounded-xl hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Submit
        </button>
        <Link className="hover:underline text-sm" to="/login">
          Already have an account? go to login
        </Link>
      </Form>
    </div>
  );
};
