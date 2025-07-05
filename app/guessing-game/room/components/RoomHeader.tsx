import { useRouter } from "next/navigation";
import { MdIosShare, MdOutlineKeyboardReturn } from "react-icons/md";

interface IRoomHeaderProps {
    room: {
        id: string;
        currentUser: number;
        maxUser: number;
    };
}

const RoomHeader = ({ room }: IRoomHeaderProps) => {
    const router = useRouter();

    const handlerShareClick = async () => {
        const shareData = {
            title: "柴題遊戲",
            text: "您的好友邀請您一起參與柴題遊戲，點擊加入我們一起玩耍吧!!!",
            url: `/guessing-game/room/${room.id}`,
        };
        await navigator.share(shareData);
    };

    return (
        <>
            <span className="font-bold text-yellow-600 text-xl">分享連結給朋友一起遊玩吧</span>
            <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-yellow-800 text-md w-52 text-center">
                    目前人數：{room.currentUser}/{room.maxUser}
                </span>
                <button
                    title="分享連結"
                    onClick={handlerShareClick}
                    className="flex justify-center items-center p-3 bg-white border-2 rounded-md border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 transition-all"
                >
                    <MdIosShare className="text-2xl" />
                </button>
                <button
                    title="返回"
                    className="flex justify-center items-center p-3 bg-white border-2 rounded-md border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 transition-all"
                    onClick={() => router.push("/guessing-game/start", { scroll: false })}
                >
                    <MdOutlineKeyboardReturn className="text-2xl" />
                </button>
            </div>
        </>
    );
};

export default RoomHeader;
