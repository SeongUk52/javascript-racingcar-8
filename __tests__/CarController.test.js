import CarController from '../src/controllers/CarController.js';
import CarService from '../src/services/CarService.js';
import CarView from '../src/views/CarView.js';
import { MissionUtils } from '@woowacourse/mission-utils';

// MissionUtils Mock 설정
jest.mock('@woowacourse/mission-utils', () => ({
  MissionUtils: {
    Random: {
      pickNumberInRange: jest.fn()
    },
    Console: {
      print: jest.fn(),
      readLineAsync: jest.fn()
    }
  }
}));

describe('CarController 클래스', () => {
  let carController;
  let mockCarService;
  let mockCarView;

  beforeEach(() => {
    mockCarService = new CarService();
    mockCarView = new CarView();
    carController = new CarController(mockCarService, mockCarView);
    jest.clearAllMocks();
  });

  describe('게임 실행', () => {
    test('정상적인 게임 플로우를 실행한다', async () => {
      // given
      const carNamesInput = 'pobi,woni';
      const attemptsInput = '2';
      
      MissionUtils.Console.readLineAsync
        .mockResolvedValueOnce(carNamesInput)
        .mockResolvedValueOnce(attemptsInput);

      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)  // 첫 번째 차수: pobi 전진
        .mockReturnValueOnce(3)   // 첫 번째 차수: woni 정지
        .mockReturnValueOnce(4)  // 두 번째 차수: pobi 전진
        .mockReturnValueOnce(4);  // 두 번째 차수: woni 전진

      // when
      await carController.run();

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n실행 결과');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : -');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : ');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith(''); // 첫 번째 차수 후 빈 줄
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('pobi : --');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('woni : -');
      // 마지막 차수에는 빈 줄 없음
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n최종 우승자 : pobi');
    });

    test('공동 우승자 게임을 실행한다', async () => {
      // given
      const carNamesInput = 'pobi,woni';
      const attemptsInput = '1';
      
      MissionUtils.Console.readLineAsync
        .mockResolvedValueOnce(carNamesInput)
        .mockResolvedValueOnce(attemptsInput);

      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)  // pobi 전진
        .mockReturnValueOnce(4);  // woni 전진

      // when
      await carController.run();

      // then
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('\n최종 우승자 : pobi, woni');
    });

    test('에러 발생 시 에러 메시지를 출력하고 에러를 다시 던진다', async () => {
      // given
      const carNamesInput = 'verylongname';
      const attemptsInput = '1';
      
      MissionUtils.Console.readLineAsync
        .mockResolvedValueOnce(carNamesInput)
        .mockResolvedValueOnce(attemptsInput);

      // when & then
      await expect(carController.run()).rejects.toThrow('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
    });

    test('시도 횟수 에러 발생 시 에러 메시지를 출력한다', async () => {
      // given
      const carNamesInput = 'pobi,woni';
      const attemptsInput = '0';
      
      MissionUtils.Console.readLineAsync
        .mockResolvedValueOnce(carNamesInput)
        .mockResolvedValueOnce(attemptsInput);

      // when & then
      await expect(carController.run()).rejects.toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
      expect(MissionUtils.Console.print).toHaveBeenCalledWith('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });
  });

  describe('의존성 주입', () => {
    test('기본 생성자로 인스턴스를 생성할 수 있다', () => {
      // when
      const controller = new CarController();

      // then
      expect(controller).toBeInstanceOf(CarController);
    });

    test('커스텀 Service와 View를 주입할 수 있다', () => {
      // given
      const customService = new CarService();
      const customView = new CarView();

      // when
      const controller = new CarController(customService, customView);

      // then
      expect(controller).toBeInstanceOf(CarController);
    });
  });
});
