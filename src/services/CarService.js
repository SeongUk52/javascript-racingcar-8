import Car from '../models/Car.js';
import CarRepository from '../repositories/CarRepository.js';
import { MissionUtils } from '@woowacourse/mission-utils';

/**
 * 자동차 경주 게임의 비즈니스 로직을 담당하는 Service 클래스
 * 게임 규칙, 검증, 우승자 판별 등의 로직을 처리한다.
 */
class CarService {
  #carRepository;
  #MOVING_THRESHOLD = 4;

  constructor(carRepository = new CarRepository()) {
    this.#carRepository = carRepository;
  }

  /**
   * 자동차 이름들을 검증하고 Car 객체들을 생성한다.
   * @param {string[]} carNames - 자동차 이름 배열
   * @throws {Error} 검증 실패 시 에러 발생
   */
  createCars(carNames) {
    this.#validateCarNames(carNames);
    this.#carRepository.clear();
    
    for (const name of carNames) {
      const car = new Car(name);
      this.#carRepository.save(car);
    }
  }

  /**
   * 모든 자동차를 한 번씩 이동시킨다.
   */
  moveAllCars() {
    const cars = this.#carRepository.findAll();
    
    for (const car of cars) {
      const randomValue = MissionUtils.Random.pickNumberInRange(0, 9);
      if (randomValue >= this.#MOVING_THRESHOLD) {
        car.move();
      }
    }
  }

  /**
   * 현재 모든 자동차의 상태를 반환한다.
   * @returns {Array} 자동차 이름과 위치 정보 배열
   */
  getCurrentStatus() {
    return this.#carRepository.findAll().map(car => ({
      name: car.getName(),
      position: car.getPosition(),
      displayPosition: car.getDisplayPosition()
    }));
  }

  /**
   * 우승자를 찾아 반환한다.
   * @returns {string[]} 우승자 이름 배열
   * @throws {Error} 자동차가 없을 때 에러 발생
   */
  findWinners() {
    const cars = this.#carRepository.findAll();
    if (cars.length === 0) {
      throw new Error('[ERROR] 경주할 자동차가 없습니다.');
    }

    const maxPosition = Math.max(...cars.map(car => car.getPosition()));
    
    return cars
      .filter(car => car.getPosition() === maxPosition)
      .map(car => car.getName());
  }

  /**
   * 자동차 이름들을 검증한다.
   * @param {string[]} carNames - 검증할 자동차 이름 배열
   * @throws {Error} 검증 실패 시 에러 발생
   */
  #validateCarNames(carNames) {
    if (!Array.isArray(carNames) || carNames.length === 0) {
      throw new Error('[ERROR] 자동차 이름이 입력되지 않았습니다.');
    }

    for (const name of carNames) {
      if (typeof name !== 'string' || name.trim() === '') {
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
  }

  /**
   * 시도 횟수를 검증한다.
   * @param {number} attempts - 시도 횟수
   * @throws {Error} 검증 실패 시 에러 발생
   */
  validateAttempts(attempts) {
    if (!Number.isInteger(attempts) || attempts <= 0) {
      throw new Error('[ERROR] 시도 횟수는 양의 정수여야 합니다.');
    }
  }
}

export default CarService;
