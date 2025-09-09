"use client";

import { api } from "@/libs/axios";

const LoginPage = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const response = await api.post("/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (response.status === 200) {
      alert("登入成功");
    } else {
      alert("登入失敗");
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input className="border border-gray-300 rounded-md p-2" type="email" name="email" placeholder="Email" />
        <input
          className="border border-gray-300 rounded-md p-2"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
          登入
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
