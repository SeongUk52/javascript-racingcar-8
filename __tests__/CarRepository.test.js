import CarRepository from '../src/repositories/CarRepository.js';
import Car from '../src/models/Car.js';

describe('CarRepository 클래스', () => {
  let carRepository;

  beforeEach(() => {
    carRepository = new CarRepository();
  });

  test('새로운 Repository는 빈 상태이다', () => {
    // when & then
    expect(carRepository.count()).toBe(0);
    expect(carRepository.findAll()).toEqual([]);
  });

  test('자동차를 저장할 수 있다', () => {
    // given
    const car = new Car('pobi');

    // when
    carRepository.save(car);

    // then
    expect(carRepository.count()).toBe(1);
    expect(carRepository.findAll()).toHaveLength(1);
    expect(carRepository.findAll()[0]).toBe(car);
  });

  test('여러 자동차를 저장할 수 있다', () => {
    // given
    const car1 = new Car('pobi');
    const car2 = new Car('woni');
    const car3 = new Car('jun');

    // when
    carRepository.save(car1);
    carRepository.save(car2);
    carRepository.save(car3);

    // then
    expect(carRepository.count()).toBe(3);
    expect(carRepository.findAll()).toHaveLength(3);
  });

  test('findAll()은 복사본을 반환한다', () => {
    // given
    const car = new Car('pobi');
    carRepository.save(car);

    // when
    const cars = carRepository.findAll();
    cars.push(new Car('woni')); // 복사본에 추가

    // then
    expect(carRepository.count()).toBe(1); // 원본은 변경되지 않음
    expect(cars).toHaveLength(2); // 복사본은 변경됨
  });

  test('clear()로 모든 자동차를 제거할 수 있다', () => {
    // given
    const car1 = new Car('pobi');
    const car2 = new Car('woni');
    carRepository.save(car1);
    carRepository.save(car2);

    // when
    carRepository.clear();

    // then
    expect(carRepository.count()).toBe(0);
    expect(carRepository.findAll()).toEqual([]);
  });
});
