export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <span className="brand-mark" aria-hidden="true">
                짬
              </span>
              <span className="brand-name">
                짬봇 <em>JJAMBOT</em>
              </span>
            </a>
            <p>
              국방부 공공데이터 기반
              <br />
              군대 정보알림 AI 챗봇
            </p>
          </div>

          <nav className="footer-nav" aria-label="푸터 메뉴">
            <a href="#top">홈</a>
            <a href="#features">특징</a>
            <a href="#preview">주요 기능</a>
            <a href="#services">서비스</a>
            <a href="#start">시작하기</a>
          </nav>

          <div className="footer-social">
            <a
              href="https://pf.kakao.com/_xlVKrxb/chat"
              target="_blank"
              rel="noreferrer"
              aria-label="카카오톡 채팅"
              title="카카오톡 채팅"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65-.2.75-.75 2.8-.86 3.24-.13.54.2.53.42.39.17-.11 2.75-1.87 3.87-2.63.62.09 1.26.14 1.91.14 5.52 0 10-3.54 10-7.79C22 6.54 17.52 3 12 3z" />
              </svg>
            </a>
            <a
              href="https://youtu.be/T5CePHuNTMQ"
              target="_blank"
              rel="noreferrer"
              aria-label="시연 영상 (YouTube)"
              title="시연 영상"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
              </svg>
            </a>
            <a
              href="https://github.com/wookingwoo/jjambot"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3z" />
              </svg>
            </a>
            <a
              href="https://wookingwoo.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="wookingwoo 홈페이지"
              title="wookingwoo.com"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2020 JJAMBOT. All rights reserved. Developed by{" "}
            <a href="https://wookingwoo.com" target="_blank" rel="noreferrer">
              wookingwoo
            </a>
          </p>
          <p>
            이메일 문의:{" "}
            <a href="mailto:contact@wookingwoo.com">contact@wookingwoo.com</a>
            <span className="footer-divider">·</span>
            <a href="/privacy_policy.html" target="_blank">
              개인정보처리방침
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
