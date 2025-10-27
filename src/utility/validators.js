/**
 * 자동차 경주 게임의 검증 관련 유틸리티 함수들
 * 입력 데이터의 유효성을 검사하는 함수들을 제공한다.
 */

/**
 * 자동차 이름들을 검증한다.
 * @param {string} input - 쉼표로 구분된 자동차 이름 문자열
 * @throws {Error} 검증 실패 시 에러 발생
 */
export const validateCarNames = (input) => {
  if (!input || typeof input !== 'string' || input.trim() === '') {
    throw new Error('[ERROR] 자동차 이름이 입력되지 않았습니다.');
  }

  const carNames = input.split(',').map(name => name.trim());
  
  if (carNames.length === 0) {
    throw new Error('[ERROR] 자동차 이름이 입력되지 않았습니다.');
  }

  for (const name of carNames) {
    if (name === '') {
      throw new Error('[ERROR] 자동차 이름은 비어있을 수 없습니다.');
    }
    
    if (name.length > 5) {
      throw new Error('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
    }
  }

  // 중복 검사
  const uniqueNames = new Set(carNames);
  if (uniqueNames.size !== carNames.length) {
    throw new Error('[ERROR] 자동차 이름은 중복될 수 없습니다.');
  }

  return carNames;
};

/**
 * 시도 횟수를 검증한다.
 * @param {string} input - 시도 횟수 문자열
 * @throws {Error} 검증 실패 시 에러 발생
 */
export const validateAttempts = (input) => {
  if (!input || typeof input !== 'string' || input.trim() === '') {
    throw new Error('[ERROR] 시도 횟수가 입력되지 않았습니다.');
  }

  const trimmedInput = input.trim();
  
  // 숫자가 아닌 문자가 포함되어 있는지 확인
  if (!/^\d+$/.test(trimmedInput)) {
    throw new Error('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
  }

  const attempts = parseInt(trimmedInput, 10);
  
  if (isNaN(attempts) || attempts <= 0) {
    throw new Error('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
  }

  return attempts;
};

/**
 * 문자열을 쉼표로 구분하여 배열로 변환한다.
 * @param {string} input - 쉼표로 구분된 문자열
 * @returns {string[]} 변환된 배열
 */
export const parseCarNames = (input) => {
  return input.split(',').map(name => name.trim());
};
