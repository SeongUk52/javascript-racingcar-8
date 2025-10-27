import CarView from '../src/views/CarView.js';
import { MissionUtils } from '@woowacourse/mission-utils';

// MissionUtils Mock 설정
jest.mock('@woowacourse/mission-utils', () => ({
  MissionUtils: {
    Console: {
      print: jest.fn(),
      readLineAsync: jest.fn()
    }
  }
}));

describe('CarView 클래스', () => {
  let carView;

  beforeEach(() => {
    carView = new CarView();
    jest.clearAllMocks();
  });

  describe('입력 기능', () => {
    test('자동차 이름을 입력받을 수 있다', async () => {
      // given
      const expectedInput = 'pobi,woni,jun';
      MissionUtils.Console.readLineAsync.mockResolvedValue(expectedInput);

      // when
      const result = await carView.inputCarNames();

      // then
      expect(MissionUtils.Console.readLineAsync).toHaveBeenCalledWith(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n'
      );
      expect(MissionUtils.Console.readLineAsync).toHaveBeenCalledTimes(1);
      expect(result).toBe(expectedInput);
    });

    test('시도할 횟수를 입력받을 수 있다', async () => {
      // given
      const expectedInput = '5';
      MissionUtils.Console.readLineAsync.mockResolvedValue(expectedInput);

      // when
      const result = await carView.inputAttempts();

      // then
      expect(MissionUtils.Console.readLineAsync).toHaveBeenCalledWith('시도할 횟수는 몇 회인가요?\n');
      expect(MissionUtils.Console.readLineAsync).toHaveBeenCalledTimes(1);
      expect(result).toBe(expectedInput);
    });
  });

  describe('출력 기능', () => {
    test('실행 결과 헤더를 출력한다', () => {
      // when
      carView.printResultHeader();

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n실행 결과');
    });

    test('자동차 상태를 올바르게 출력한다 (빈 줄 포함)', () => {
      // given
      const status = [
        { name: 'pobi', position: 2, displayPosition: '--' },
        { name: 'woni', position: 1, displayPosition: '-' },
        { name: 'jun', position: 0, displayPosition: '' }
      ];

      // when
      carView.printCurrentStatus(status);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : --');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('jun : ');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith(''); // 빈 줄
      expect(MissionUtils.Console.print).toHaveBeenCalledTimes(4);
    });

    test('자동차 상태를 출력할 때 빈 줄을 생략할 수 있다', () => {
      // given
      const status = [
        { name: 'pobi', position: 2, displayPosition: '--' },
        { name: 'woni', position: 1, displayPosition: '-' }
      ];

      // when
      carView.printCurrentStatus(status, false);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : --');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledTimes(2);
    });

    test('단독 우승자를 올바르게 출력한다', () => {
      // given
      const winners = ['pobi'];

      // when
      carView.printWinners(winners);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n최종 우승자 : pobi');
    });

    test('공동 우승자를 올바르게 출력한다', () => {
      // given
      const winners = ['pobi', 'jun'];

      // when
      carView.printWinners(winners);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n최종 우승자 : pobi, jun');
    });

    test('게임 결과를 전체적으로 출력한다', () => {
      // given
      const gameResults = [
        [
          { name: 'pobi', position: 1, displayPosition: '-' },
          { name: 'woni', position: 0, displayPosition: '' }
        ],
        [
          { name: 'pobi', position: 2, displayPosition: '--' },
          { name: 'woni', position: 1, displayPosition: '-' }
        ]
      ];

      // when
      carView.printGameResults(gameResults);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n실행 결과');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : ');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith(''); // 첫 번째 차수 후 빈 줄
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : --');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : -');
      // 마지막 차수에는 빈 줄 없음
    });

    test('에러 메시지를 출력한다', () => {
      // given
      const errorMessage = '[ERROR] 자동차 이름은 5글자 이하여야 합니다.';

      // when
      carView.printError(errorMessage);

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('통합 테스트', () => {
    test('전체 게임 플로우 출력 테스트', async () => {
      // given
      const carNames = 'pobi,woni';
      const attempts = '3';
      const status1 = [
        { name: 'pobi', position: 1, displayPosition: '-' },
        { name: 'woni', position: 0, displayPosition: '' }
      ];
      const status2 = [
        { name: 'pobi', position: 2, displayPosition: '--' },
        { name: 'woni', position: 1, displayPosition: '-' }
      ];
      const winners = ['pobi'];

      MissionUtils.Console.readLineAsync
        .mockResolvedValueOnce(carNames)
        .mockResolvedValueOnce(attempts);

      // when
      const inputCarNames = await carView.inputCarNames();
      const inputAttempts = await carView.inputAttempts();
      
      carView.printResultHeader();
      carView.printCurrentStatus(status1);
      carView.printCurrentStatus(status2, false); // 마지막에는 빈 줄 없이
      carView.printWinners(winners);

      // then
      expect(inputCarNames).toBe(carNames);
      expect(inputAttempts).toBe(attempts);
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n실행 결과');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : ');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : --');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n최종 우승자 : pobi');
    });
  });
});
