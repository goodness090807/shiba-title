import PowerButton from "@/components/animations/PowerButton";
import Link from "next/link";
import { MdLightbulbOutline } from "react-icons/md";

export function generateMetadata() {
  return {
    title: "說明 - 柴題遊戲",
    description:
      "本網站是以柴犬為主題的題目產生器，我們提供的不只是文字描述，還搭配了生動且活潑的柴犬圖片，打造出有趣且具有特色的題目，讓您在玩遊戲的同時，也能感受到柴柴的可愛。",
  };
}

const IllustratePage = () => {
  return (
    <main className="w-full flex flex-col items-center gap-5 mb-5">
      <h1 className="text-4xl text-primary-text font-bold tracking-widest">歡迎來到柴題遊戲</h1>
      <div className="bg-white shadow-2xl rounded-md pt-5 px-3 mx-5 max-w-[650px] tracking-widest">
        <p>
          本網站是以柴犬為主題的題目產生器，我們提供的不只是文字描述，還搭配了生動且活潑的柴犬圖片，打造出有趣且具有特色的題目，讓您在玩遊戲的同時，也能感受到柴柴的可愛。
        </p>
        <p className="mt-5">每次聚會玩遊戲時，您是否有以下困擾：</p>
        <ul className="ml-3 flex flex-col gap-3 mt-3">
          <li className="border-l-4 border-emphasize-dark pl-3">花了大量時間卻想不到有趣的題目？</li>
          <li className="border-l-4 border-emphasize-dark pl-3">有了題目之後卻不知道怎麼描述？</li>
          {/* TODO：等到有介紹遊玩方式時再放這句話： <li className="border-l-4 border-emphasize-dark pl-3">有了題目之後卻想不到好玩的遊戲方式？</li> */}
        </ul>
        <p className="mt-5">
          不用擔心，全都交給柴題遊戲，柴題遊戲致力於提供優質的隨機題目產生服務，
          {/* TODO：等到有介紹遊玩方式時再放這句話：並介紹各種聚會上常見的遊戲方式 */}
          <b className="text-primary-text">你只要點柴，柴就會幫你</b>， 柴題遊戲是您的最佳選擇。
        </p>
        <Link href="/title-generator">
          <PowerButton>
            <span className="flex items-center gap-3">
              <MdLightbulbOutline className="text-2xl" />
              開始產生題目
            </span>
          </PowerButton>
        </Link>
      </div>
    </main>
  );
};

export default IllustratePage;
