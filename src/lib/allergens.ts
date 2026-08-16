export const ALLERGEN_LABELS: Record<string, string> = {
  '01': '난류',
  '02': '우유',
  '03': '메밀',
  '04': '땅콩',
  '05': '대두',
  '06': '밀',
  '07': '고등어',
  '08': '게',
  '09': '새우',
  '10': '돼지고기',
  '11': '복숭아',
  '12': '토마토',
  '13': '아황산류',
  '14': '호두',
  '15': '닭고기',
  '16': '쇠고기',
  '17': '오징어',
  '18': '조개류',
};

const ALLERGEN_CODE_RE = /\((\d{2})\)/g;

/** Pulls "(NN)" allergen codes out of a dish string, returning the codes and the code-free text. */
export function extractAllergens(text: string): { plain: string; codes: string[] } {
  const codes: string[] = [];
  for (const match of text.matchAll(ALLERGEN_CODE_RE)) {
    if (!codes.includes(match[1])) codes.push(match[1]);
  }
  const plain = text.replace(ALLERGEN_CODE_RE, '').replace(/\s{2,}/g, ' ').trim();
  return { plain, codes };
}
