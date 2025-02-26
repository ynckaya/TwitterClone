import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    const response = await loginUser(data);
    const decoded = jwtDecode(response.token);
    login(decoded);
    history.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nickname"
          {...register("nickname", { required: "Nickname giriniz!" })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>}
        <input
          type="password"
          placeholder="Şifre"
          {...register("password", { required: "Şifre giriniz!" })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded mt-4"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
