/**
 * 자동차 모델 클래스
 * 자동차의 기본 정보와 상태를 관리한다.
 */
class Car {
  #name;
  #position;

  /**
   * 자동차 인스턴스를 생성한다.
   * @param {string} name - 자동차 이름
   */
  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  /**
   * 자동차를 한 칸 전진시킨다.
   */
  move() {
    this.#position += 1;
  }

  /**
   * 자동차의 이름을 반환한다.
   * @returns {string} 자동차 이름
   */
  getName() {
    return this.#name;
  }

  /**
   * 자동차의 현재 위치를 반환한다.
   * @returns {number} 현재 위치
   */
  getPosition() {
    return this.#position;
  }

  /**
   * 자동차의 현재 상태를 문자열로 반환한다.
   * @returns {string} 현재 위치만큼의 '-' 문자열
   */
  getDisplayPosition() {
    return '-'.repeat(this.#position);
  }
}

export default Car;
