import axios from "axios";

const BASE_URL = "http://localhost:5000";

interface TSignUpUser {
  email: string;
  password: string;
  name: string;
}

interface TCreateUserResponse {
  user: string;
}

export const signUpUser = async ({ email, password, name }: TSignUpUser) => {
  const user = await axios.post<TCreateUserResponse>(
    `${BASE_URL}/sign-up`,
    { email, password, name },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (user) {
    console.log(user);
  }
};
