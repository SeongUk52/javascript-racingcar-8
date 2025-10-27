/**
 * 자동차 경주 게임의 출력 포맷팅 관련 유틸리티 함수들
 * 출력 형식을 일관성 있게 관리하는 함수들을 제공한다.
 */

/**
 * 자동차 상태를 출력 형식으로 포맷팅한다.
 * @param {string} name - 자동차 이름
 * @param {string} displayPosition - 위치 표시 문자열
 * @returns {string} 포맷팅된 자동차 상태 문자열
 */
export const formatCarStatus = (name, displayPosition) => {
  return `${name} : ${displayPosition}`;
};

/**
 * 우승자 목록을 출력 형식으로 포맷팅한다.
 * @param {string[]} winners - 우승자 이름 배열
 * @returns {string} 포맷팅된 우승자 문자열
 */
export const formatWinners = (winners) => {
  const winnerNames = winners.join(', ');
  return `\n최종 우승자 : ${winnerNames}`;
};

/**
 * 에러 메시지를 출력 형식으로 포맷팅한다.
 * @param {string} message - 에러 메시지
 * @returns {string} 포맷팅된 에러 메시지
 */
export const formatErrorMessage = (message) => {
  return message; // 이미 [ERROR] 접두사가 포함되어 있음
};

/**
 * 실행 결과 헤더를 포맷팅한다.
 * @returns {string} 포맷팅된 헤더 문자열
 */
export const formatResultHeader = () => {
  return '\n실행 결과';
};

/**
 * 자동차 이름 입력 프롬프트를 포맷팅한다.
 * @returns {string} 포맷팅된 프롬프트 문자열
 */
export const formatCarNamesPrompt = () => {
  return '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n';
};

/**
 * 시도 횟수 입력 프롬프트를 포맷팅한다.
 * @returns {string} 포맷팅된 프롬프트 문자열
 */
export const formatAttemptsPrompt = () => {
  return '시도할 횟수는 몇 회인가요?\n';
};
