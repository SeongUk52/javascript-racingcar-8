import { 
  formatCarStatus, 
  formatWinners, 
  formatErrorMessage, 
  formatResultHeader, 
  formatCarNamesPrompt, 
  formatAttemptsPrompt 
} from '../src/utilities/formatters.js';

describe('formatters 유틸리티', () => {
  describe('formatCarStatus', () => {
    test('자동차 상태를 올바르게 포맷팅한다', () => {
      // when
      const result = formatCarStatus('pobi', '---');

      // then
      expect(result).toBe('pobi : ---');
    });

    test('빈 위치 문자열도 올바르게 포맷팅한다', () => {
      // when
      const result = formatCarStatus('woni', '');

      // then
      expect(result).toBe('woni : ');
    });
  });

  describe('formatWinners', () => {
    test('단독 우승자를 올바르게 포맷팅한다', () => {
      // when
      const result = formatWinners(['pobi']);

      // then
      expect(result).toBe('최종 우승자 : pobi');
    });

    test('공동 우승자를 올바르게 포맷팅한다', () => {
      // when
      const result = formatWinners(['pobi', 'jun']);

      // then
      expect(result).toBe('최종 우승자 : pobi, jun');
    });

    test('여러 우승자를 올바르게 포맷팅한다', () => {
      // when
      const result = formatWinners(['pobi', 'woni', 'jun']);

      // then
      expect(result).toBe('최종 우승자 : pobi, woni, jun');
    });
  });

  describe('formatErrorMessage', () => {
    test('에러 메시지를 그대로 반환한다', () => {
      // given
      const errorMessage = '[ERROR] 자동차 이름은 5글자 이하여야 합니다.';

      // when
      const result = formatErrorMessage(errorMessage);

      // then
      expect(result).toBe(errorMessage);
    });
  });

  describe('formatResultHeader', () => {
    test('실행 결과 헤더를 올바르게 포맷팅한다', () => {
      // when
      const result = formatResultHeader();

      // then
      expect(result).toBe('\n실행 결과');
    });
  });

  describe('formatCarNamesPrompt', () => {
    test('자동차 이름 입력 프롬프트를 올바르게 포맷팅한다', () => {
      // when
      const result = formatCarNamesPrompt();

      // then
      expect(result).toBe('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)');
    });
  });

  describe('formatAttemptsPrompt', () => {
    test('시도 횟수 입력 프롬프트를 올바르게 포맷팅한다', () => {
      // when
      const result = formatAttemptsPrompt();

      // then
      expect(result).toBe('시도할 횟수는 몇 회인가요?');
    });
  });

  describe('통합 테스트', () => {
    test('전체 게임 출력 포맷팅 테스트', () => {
      // given
      const carStatus1 = formatCarStatus('pobi', '-');
      const carStatus2 = formatCarStatus('woni', '--');
      const winners = formatWinners(['pobi']);
      const header = formatResultHeader();

      // when & then
      expect(carStatus1).toBe('pobi : -');
      expect(carStatus2).toBe('woni : --');
      expect(winners).toBe('최종 우승자 : pobi');
      expect(header).toBe('\n실행 결과');
    });
  });
});
