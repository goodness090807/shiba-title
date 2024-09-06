"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const useRoomInfo = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roomInfo, setRoomInfo] = useState(null);

    useEffect(() => {
        const getRoomInfo = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/room/${id}`);

                if (response.data.isFull) {
                    setError("房間已滿");
                } else {
                    setRoomInfo(response.data);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status == 404) {
                        setError("找不到房間");
                    } else {
                        setError("伺服器錯誤");
                    }
                }
            }

            setLoading(false);
        };
        getRoomInfo();
    }, [id]);

    return { loading: loading, roomInfo: roomInfo, error: error };
};
