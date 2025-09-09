"use client";

import { api } from "@/libs/axios";

const RelateTitle = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const response = await api.post("/titles/related", {
      titleId: formData.get("titleId"),
      relatedTitleId: formData.get("relatedTitleId"),
    });
    if (response.status === 200) {
      alert("關聯成功");
    } else {
      alert("關聯失敗");
    }
  };

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input className="border border-gray-300 rounded-md p-2" type="text" name="titleId" placeholder="題目的ID" />
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          name="relatedTitleId"
          placeholder="相關題目的ID"
        />

        <button className="bg-blue-500 text-white p-2" type="submit">
          設定關聯
        </button>
      </form>
    </div>
  );
};

export default RelateTitle;
