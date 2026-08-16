import PhoneFrame from "./PhoneFrame";

export default function ChatDemo() {
  return (
    <PhoneFrame
      subtitle="군대 정보알림 AI 챗봇"
      footer={
        <div className="phone-quick">
          <span>오늘</span>
          <span>내일</span>
          <span>오늘 아침</span>
          <span>오늘 점심</span>
          <span>PX 인기상품</span>
        </div>
      }
    >
      <div className="bubble bubble-user msg-1">내일 메뉴 어떤거 나와?</div>

      <div className="bubble bubble-bot msg-2">
        <div className="menu-card">
          <div className="menu-date">7월 14일 화요일 · 5322부대 식단</div>
          <div className="menu-row">
            <span className="menu-tag">아침</span>
            감자밥 · 꼬리곰탕 · 배추김치
          </div>
          <div className="menu-row">
            <span className="menu-tag">점심</span>
            검은콩밥 · 닭볶음탕 · 오징어튀김
          </div>
          <div className="menu-row">
            <span className="menu-tag">저녁</span>
            잡곡밥 · 된장국 · 오리불고기
          </div>
          <div className="menu-row">
            <span className="menu-tag menu-tag-side">부식</span>
            우유 · 아이스크림
          </div>
        </div>
      </div>

      <div className="bubble bubble-user msg-3">TMO가 뭐야?</div>

      <div className="bubble bubble-bot msg-4">
        <b>TMO(여행장병 안내소)</b>는 기차역에서 장병들의 여행 편의를
        지원하는 곳이에요. 승차권 발급과 안내를 도와드립니다. 🚆
      </div>

      <div className="bubble bubble-bot bubble-typing msg-5">
        <span />
        <span />
        <span />
      </div>
    </PhoneFrame>
  );
}
