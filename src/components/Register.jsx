import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      login(response.token);
      toast.success("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...");
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Kayıt Ol</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Ad Soyad"
          {...register("name", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Nickname"
          {...register("nickname", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <input
          type="password"
          placeholder="Şifre"
          {...register("password", { required: true })}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full p-2 rounded mt-4"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
