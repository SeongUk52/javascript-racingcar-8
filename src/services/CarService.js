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
   */
  createCars(carNames) {
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

}

export default CarService;
