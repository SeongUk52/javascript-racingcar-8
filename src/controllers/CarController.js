import CarService from '../services/CarService.js';
import CarView from '../views/CarView.js';
import { validateCarNames, validateAttempts } from '../utilities/validators.js';

/**
 * 자동차 경주 게임의 전체 흐름을 제어하는 Controller 클래스
 * 사용자 입력 처리, 게임 로직 실행, 에러 처리 등을 담당한다.
 */
class CarController {
  #carService;
  #carView;

  constructor(carService = new CarService(), carView = new CarView()) {
    this.#carService = carService;
    this.#carView = carView;
  }

  /**
   * 자동차 경주 게임을 실행한다.
   */
  async run() {
    try {
      // 1. 자동차 이름 입력 및 검증
      const carNamesInput = await this.#carView.inputCarNames();
      const carNames = validateCarNames(carNamesInput);
      
      // 2. 시도 횟수 입력 및 검증
      const attemptsInput = await this.#carView.inputAttempts();
      const attempts = validateAttempts(attemptsInput);

      // 3. 게임 진행
      const gameResult = this.#carService.playGame(carNames, attempts);

      // 4. 게임 결과 출력
      this.#carView.printGameResults(gameResult.gameResults);
      this.#carView.printWinners(gameResult.winners);
    } catch (error) {
      this.#carView.printError(error.message);
      throw error;
    }
  }
}

export default CarController;
