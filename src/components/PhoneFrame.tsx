import { type ReactNode } from "react";

interface PhoneFrameProps {
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** 짬봇 앱 화면을 담는 공통 폰 프레임 (노치 + 헤더 + 본문) */
export default function PhoneFrame({ subtitle, children, footer }: PhoneFrameProps) {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-notch" />
      <div className="phone-header">
        <span className="phone-avatar">짬</span>
        <div>
          <strong>짬봇</strong>
          <small>{subtitle}</small>
        </div>
        <span className="phone-online" />
      </div>
      <div className="phone-body">{children}</div>
      {footer}
    </div>
  );
}
