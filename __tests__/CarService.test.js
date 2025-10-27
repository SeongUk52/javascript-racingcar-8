import CarService from '../src/services/CarService.js';
import CarRepository from '../src/repositories/CarRepository.js';
import { MissionUtils } from '@woowacourse/mission-utils';

// MissionUtils Mock 설정
jest.mock('@woowacourse/mission-utils', () => ({
  MissionUtils: {
    Random: {
      pickNumberInRange: jest.fn()
    }
  }
}));

describe('CarService 클래스', () => {
  let carService;
  let mockRepository;

  beforeEach(() => {
    mockRepository = new CarRepository();
    carService = new CarService(mockRepository);
  });

  describe('자동차 생성 및 검증', () => {
    test('유효한 자동차 이름들로 자동차를 생성할 수 있다', () => {
      // given
      const carNames = ['pobi', 'woni', 'jun'];

      // when
      carService.createCars(carNames);

      // then
      expect(mockRepository.count()).toBe(3);
      const cars = mockRepository.findAll();
      expect(cars[0].getName()).toBe('pobi');
      expect(cars[1].getName()).toBe('woni');
      expect(cars[2].getName()).toBe('jun');
    });

    test('자동차 이름이 5글자를 초과하면 에러가 발생한다', () => {
      // given
      const carNames = ['pobi', 'verylongname'];

      // when & then
      expect(() => {
        carService.createCars(carNames);
      }).toThrow('[ERROR] 자동차 이름은 5글자 이하여야 합니다.');
    });

    test('자동차 이름이 비어있으면 에러가 발생한다', () => {
      // given
      const carNames = ['pobi', ''];

      // when & then
      expect(() => {
        carService.createCars(carNames);
      }).toThrow('[ERROR] 자동차 이름은 비어있을 수 없습니다.');
    });

    test('중복된 자동차 이름이 있으면 에러가 발생한다', () => {
      // given
      const carNames = ['pobi', 'woni', 'pobi'];

      // when & then
      expect(() => {
        carService.createCars(carNames);
      }).toThrow('[ERROR] 자동차 이름은 중복될 수 없습니다.');
    });

    test('자동차 이름 배열이 비어있으면 에러가 발생한다', () => {
      // given
      const carNames = [];

      // when & then
      expect(() => {
        carService.createCars(carNames);
      }).toThrow('[ERROR] 자동차 이름이 입력되지 않았습니다.');
    });
  });

  describe('자동차 이동', () => {
    beforeEach(() => {
      carService.createCars(['pobi', 'woni']);
    });

    test('랜덤 값이 4 이상일 때 자동차가 전진한다', () => {
      // given
      MissionUtils.Random.pickNumberInRange.mockReturnValue(4);

      // when
      carService.moveAllCars();

      // then
      const status = carService.getCurrentStatus();
      expect(status[0].position).toBe(1);
      expect(status[1].position).toBe(1);
    });

    test('랜덤 값이 3 이하일 때 자동차가 전진하지 않는다', () => {
      // given
      MissionUtils.Random.pickNumberInRange.mockReturnValue(3);

      // when
      carService.moveAllCars();

      // then
      const status = carService.getCurrentStatus();
      expect(status[0].position).toBe(0);
      expect(status[1].position).toBe(0);
    });

    test('각 자동차마다 다른 랜덤 값으로 이동한다', () => {
      // given
      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)  // pobi는 전진
        .mockReturnValueOnce(3);  // woni는 정지

      // when
      carService.moveAllCars();

      // then
      const status = carService.getCurrentStatus();
      expect(status[0].position).toBe(1);
      expect(status[1].position).toBe(0);
    });
  });

  describe('현재 상태 조회', () => {
    test('자동차의 현재 상태를 올바르게 반환한다', () => {
      // given
      carService.createCars(['pobi', 'woni']);
      MissionUtils.Random.pickNumberInRange.mockReturnValue(4);
      carService.moveAllCars();

      // when
      const status = carService.getCurrentStatus();

      // then
      expect(status).toHaveLength(2);
      expect(status[0]).toEqual({
        name: 'pobi',
        position: 1,
        displayPosition: '-'
      });
      expect(status[1]).toEqual({
        name: 'woni',
        position: 1,
        displayPosition: '-'
      });
    });
  });

  describe('우승자 찾기', () => {
    test('단독 우승자를 올바르게 찾는다', () => {
      // given
      carService.createCars(['pobi', 'woni', 'jun']);
      
      // pobi만 전진
      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)  // pobi 전진
        .mockReturnValueOnce(3)   // woni 정지
        .mockReturnValueOnce(3);  // jun 정지
      carService.moveAllCars();

      // when
      const winners = carService.findWinners();

      // then
      expect(winners).toEqual(['pobi']);
    });

    test('공동 우승자를 올바르게 찾는다', () => {
      // given
      carService.createCars(['pobi', 'woni', 'jun']);
      
      // pobi와 jun이 전진
      MissionUtils.Random.pickNumberInRange
        .mockReturnValueOnce(4)  // pobi 전진
        .mockReturnValueOnce(3)   // woni 정지
        .mockReturnValueOnce(4);  // jun 전진
      carService.moveAllCars();

      // when
      const winners = carService.findWinners();

      // then
      expect(winners).toEqual(['pobi', 'jun']);
    });

    test('자동차가 없으면 에러가 발생한다', () => {
      // when & then
      expect(() => {
        carService.findWinners();
      }).toThrow('[ERROR] 경주할 자동차가 없습니다.');
    });
  });

  describe('시도 횟수 검증', () => {
    test('유효한 시도 횟수를 통과시킨다', () => {
      // when & then
      expect(() => {
        carService.validateAttempts(5);
      }).not.toThrow();
    });

    test('양수가 아닌 시도 횟수는 에러를 발생시킨다', () => {
      // when & then
      expect(() => {
        carService.validateAttempts(0);
      }).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');

      expect(() => {
        carService.validateAttempts(-1);
      }).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });

    test('정수가 아닌 시도 횟수는 에러를 발생시킨다', () => {
      // when & then
      expect(() => {
        carService.validateAttempts(3.5);
      }).toThrow('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    });
  });
});
