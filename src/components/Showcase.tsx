import { type ComponentType } from "react";
import Reveal from "./Reveal";
import MenuScreen from "./MenuScreen";
import DictionaryScreen from "./DictionaryScreen";
import WelfareScreen from "./WelfareScreen";

interface Item {
  tag: string;
  title: string;
  desc: string;
  notes: string[];
  Visual: ComponentType;
}

const ITEMS: Item[] = [
  {
    tag: "식단 조회",
    title: "부대 식단정보",
    desc: "본인의 급양대를 선택하면 원하는 날짜의 아침·점심·저녁 식단을 바로 확인할 수 있습니다. 알러지 설정으로 알러지 표기를 켜고 끌 수 있습니다.",
    notes: [
      "국방부 공공데이터 “군 급양대별 병영 표준 식단 정보” 기반으로 제공되며, 급양대 상황에 따라 실제 식단과 차이가 있을 수 있습니다.",
    ],
    Visual: MenuScreen,
  },
  {
    tag: "군 용어 & 인물 사전",
    title: "올바른 국방 언어를 위한 사전",
    desc: "어려운 군 용어를 풀어 설명하고, 대화 중 금칙어나 비표준어를 쓰면 올바른 표준용어로 자동 교정해 줍니다. 호국선열 등 역사적 인물 정보도 담아 정신전력 교육 자료로 활용할 수 있습니다.",
    notes: [
      "활용 공공데이터: 전쟁기념관 행사정보 · 호국선열 정보 · 월남전쟁 정보 · 6·25전쟁 정보 · 군사 용어 정보 · 국방데이터 표준단어 목록",
    ],
    Visual: DictionaryScreen,
  },
  {
    tag: "복지 정보",
    title: "군생활에 필요한 각종 복지정보",
    desc: "PX 인기상품, 군병원, TMO, 주변 관광지, 병사 할인혜택, 월급 정보, 보급 기준, 체력검정 기준, 예비군 정보까지 — 궁금한 것을 물어보면 바로 알려드립니다.",
    notes: [
      "활용 공공데이터: PX 인기상품 · 군병원 · TMO · 군 복지시설 주변 관광지 · 병사 할인 혜택 · 봉급표 · 보급기준 · 체력검정 기준 · 군 감염병 · 학군단 · 예비군 훈련장 및 부대 연락처",
    ],
    Visual: WelfareScreen,
  },
];

export default function Showcase() {
  return (
    <section className="showcase section" id="preview">
      <div className="container">
        <Reveal>
          <span className="section-tag">
            <i>02</i> Features
          </span>
          <h2 className="section-title">
            73,000여 가지 군 생활 정보를
            <br />
            대화 한 번으로
          </h2>
        </Reveal>

        {ITEMS.map((item, i) => (
          <div className={`showcase-row ${i % 2 ? "showcase-row-flip" : ""}`} key={item.title}>
            <Reveal from={i % 2 ? "right" : "left"} className="showcase-media-wrap">
              <div className="showcase-media">
                <div className="showcase-device">
                  <item.Visual />
                </div>
              </div>
            </Reveal>
            <Reveal from={i % 2 ? "left" : "right"} className="showcase-copy">
              <span className="showcase-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pill pill-sm">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.notes.map((n) => (
                <small key={n}>{n}</small>
              ))}
              <small className="showcase-both">
                짬봇-채팅과 짬봇-보이스에서 모두 이용할 수 있습니다.
              </small>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
