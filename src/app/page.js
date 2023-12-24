"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";

export default function Home() {
	return (
		<div className="flex flex-col gap-4 pt-1">
			<h2 className="font-bold text-yellow-600 text-lg">
				本柴給你無限想像
			</h2>
			<LinkButton href={"/start"}>遊戲開始</LinkButton>
			<FunctionButton
				onClick={() =>
					alert(
						'這是一款線上線下結合的猜題遊戲，可以拿來為遊戲出題，也可以擁有多變化的玩法，你只要理柴，柴就會幫你。\r\n\r\n遊玩方式：\r\n\r\n1.點擊"遊戲開始"會產生一張隨機的題目卡。\r\n\r\n2.遊戲中點擊卡牌會翻到背面。\r\n\r\n3.點擊"重新產生"會產生一個新題目。\r\n\r\n5.點擊"返回"回首頁。'
					)
				}
			>
				說明
			</FunctionButton>
		</div>
	);
}
