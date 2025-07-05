"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export interface RoomInfo {
    id: string;
    isFull: boolean;
    maxUser: number;
    currentUser: number;
    withoutSelfUsers: IUser[];
}

export interface IUser {
    socketId: string;
    userName: string;
    questionUrl: string;
    questionTitle: string;
}

export const useRoomInfo = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

    useEffect(() => {
        const getRoomInfo = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/room/${id}`);

                if (response.data.isFull) {
                    setError("房間已滿");
                } else {
                    setRoomInfo(response.data);
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response) {
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
