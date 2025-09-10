"use client";

import { api } from "@/libs/axios";

const UploadTitlePage = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await api.post("/titles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
    } catch {
      alert("上傳失敗");
    }
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input className="border border-gray-300 rounded-md p-2" type="file" name="image" placeholder="圖片網址" />

        <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" type="submit">
          上傳圖片
        </button>
      </form>
    </div>
  );
};

export default UploadTitlePage;
