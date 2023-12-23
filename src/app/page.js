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
						'1.點擊"遊戲開始"就會直接開始遊戲並產生隨機一個題目。\r\n\r\n2.進入遊戲後點擊卡背翻牌。\r\n\r\n3.再點一次卡牌會轉回背面。\r\n\r\n4.點擊"重新產生"會產生一個新題目。\r\n\r\n5.點擊"返回"回首頁。'
					)
				}
			>
				說明
			</FunctionButton>
		</div>
	);
}
