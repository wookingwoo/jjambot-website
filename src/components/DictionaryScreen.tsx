import PhoneFrame from "./PhoneFrame";

export default function DictionaryScreen() {
  return (
    <PhoneFrame subtitle="군 용어 · 인물 사전">
      <div className="app-screen dict-app">
        <div className="dict-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>가라</span>
        </div>

        <div className="dict-result">
          <span className="dict-result-label">비표준어 교정</span>
          <p className="dict-correct">
            <s>가라</s> <span className="dict-arrow">→</span> <b>허위</b>
          </p>
          <p className="dict-desc">
            표준화 기준에 맞춰 올바른 표현으로 안내하고, 대화 중 비표준어를
            쓰면 자동으로 교정해 드려요.
          </p>
        </div>

        <div className="person-card">
          <span className="person-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5" />
              <path d="m8.5 12.5-1.7 7.5 5.2-2.7 5.2 2.7-1.7-7.5" />
            </svg>
          </span>
          <div>
            <span className="person-name">
              안중근 <em>독립운동가</em>
            </span>
            <p>1909년 하얼빈에서 한국 독립운동의 의지를 세계에 알린 인물이에요.</p>
          </div>
        </div>

        <div className="dict-foot">
          <span className="pill pill-sm">호국선열 정보</span>
          <span className="pill pill-sm">6·25전쟁 정보</span>
        </div>
      </div>
    </PhoneFrame>
  );
}
