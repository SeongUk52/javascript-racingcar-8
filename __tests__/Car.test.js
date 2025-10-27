import Car from '../src/models/Car.js';

describe('Car 클래스', () => {
  test('자동차 생성 시 이름과 초기 위치가 설정된다', () => {
    // given
    const carName = 'pobi';

    // when
    const car = new Car(carName);

    // then
    expect(car.getName()).toBe('pobi');
    expect(car.getPosition()).toBe(0);
  });

  test('move() 호출 시 위치가 1 증가한다', () => {
    // given
    const car = new Car('pobi');

    // when
    car.move();

    // then
    expect(car.getPosition()).toBe(1);
  });

  test('여러 번 move() 호출 시 위치가 누적된다', () => {
    // given
    const car = new Car('pobi');

    // when
    car.move();
    car.move();
    car.move();

    // then
    expect(car.getPosition()).toBe(3);
  });

  test('getDisplayPosition()은 현재 위치만큼의 "-" 문자열을 반환한다', () => {
    // given
    const car = new Car('pobi');
    car.move();
    car.move();

    // when
    const displayPosition = car.getDisplayPosition();

    // then
    expect(displayPosition).toBe('--');
  });

  test('위치가 0일 때 getDisplayPosition()은 빈 문자열을 반환한다', () => {
    // given
    const car = new Car('pobi');

    // when
    const displayPosition = car.getDisplayPosition();

    // then
    expect(displayPosition).toBe('');
  });
});
