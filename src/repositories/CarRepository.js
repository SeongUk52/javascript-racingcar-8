import Car from '../models/Car.js';

/**
 * 자동차 데이터 접근을 담당하는 Repository 클래스
 * 자동차 데이터의 저장, 조회, 관리를 담당한다.
 */
class CarRepository {
  #cars;

  constructor() {
    this.#cars = [];
  }

  /**
   * 자동차를 저장한다.
   * @param {Car} car - 저장할 자동차 객체
   */
  save(car) {
    this.#cars.push(car);
  }

  /**
   * 모든 자동차를 조회한다.
   * @returns {Car[]} 저장된 모든 자동차 배열
   */
  findAll() {
    return [...this.#cars];
  }

  /**
   * 저장된 자동차의 개수를 반환한다.
   * @returns {number} 자동차 개수
   */
  count() {
    return this.#cars.length;
  }

  /**
   * 모든 자동차를 초기화한다.
   */
  clear() {
    this.#cars = [];
  }
}

export default CarRepository;
