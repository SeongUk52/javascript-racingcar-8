import { validateCarNames, validateAttempts, parseCarNames } from '../src/utility/validators.js';

describe('validators 유틸리티', () => {
  describe('validateCarNames', () => {
    test('유효한 자동차 이름들을 통과시킨다', () => {
      // when
      const result = validateCarNames('pobi,woni,jun');

      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('공백이 포함된 자동차 이름들을 정리한다', () => {
      // when
      const result = validateCarNames(' pobi , woni , jun ');

      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('빈 입력은 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateCarNames('')).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
      expect(() => validateCarNames('   ')).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
      expect(() => validateCarNames(null)).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
      expect(() => validateCarNames(undefined)).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
    });

    test('자동차 이름이 5글자를 초과하면 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateCarNames('verylongname')).toThrow('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
      expect(() => validateCarNames('pobi,verylongname')).toThrow('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
    });

    test('빈 자동차 이름이 있으면 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateCarNames('pobi,,jun')).toThrow('[ERROR] 자동차 이름은 비어있을 수 없습니다.');
      expect(() => validateCarNames('pobi, ,jun')).toThrow('[ERROR] 자동차 이름은 비어있을 수 없습니다.');
    });

    test('중복된 자동차 이름이 있으면 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateCarNames('pobi,pobi,jun')).toThrow('[ERROR] 자동차 이름은 중복될 수 없습니다.');
      expect(() => validateCarNames('pobi,woni,pobi')).toThrow('[ERROR] 자동차 이름은 중복될 수 없습니다.');
    });

    test('문자열이 아닌 입력은 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateCarNames(123)).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
      expect(() => validateCarNames([])).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
    });
  });

  describe('validateAttempts', () => {
    test('유효한 시도 횟수를 통과시킨다', () => {
      // when
      const result = validateAttempts('5');

      // then
      expect(result).toBe(5);
    });

    test('공백이 포함된 시도 횟수를 정리한다', () => {
      // when
      const result = validateAttempts(' 5 ');

      // then
      expect(result).toBe(5);
    });

    test('빈 입력은 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateAttempts('')).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
      expect(() => validateAttempts('   ')).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
      expect(() => validateAttempts(null)).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
      expect(() => validateAttempts(undefined)).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
    });

    test('양수가 아닌 시도 횟수는 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateAttempts('0')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
      expect(() => validateAttempts('-1')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });

    test('정수가 아닌 시도 횟수는 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateAttempts('3.5')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
      expect(() => validateAttempts('3.0')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });

    test('숫자가 아닌 입력은 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateAttempts('abc')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
      expect(() => validateAttempts('5a')).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });

    test('문자열이 아닌 입력은 에러를 발생시킨다', () => {
      // when & then
      expect(() => validateAttempts(5)).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
      expect(() => validateAttempts([])).toThrow('[ERROR] 시도 횟수가 입력되지 않았습니다.');
    });
  });

  describe('parseCarNames', () => {
    test('쉼표로 구분된 문자열을 배열로 변환한다', () => {
      // when
      const result = parseCarNames('pobi,woni,jun');

      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('공백이 포함된 문자열을 정리한다', () => {
      // when
      const result = parseCarNames(' pobi , woni , jun ');

      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('빈 문자열을 처리한다', () => {
      // when
      const result = parseCarNames('');

      // then
      expect(result).toEqual(['']);
    });
  });
});
