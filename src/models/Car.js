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
}

module.exports = Car;
