import { MissionUtils } from '@woowacourse/mission-utils';
import { 
  formatCarNamesPrompt, 
  formatAttemptsPrompt, 
  formatResultHeader, 
  formatCarStatus, 
  formatWinners 
} from '../utility/formatters.js';

/**
 * 자동차 경주 게임의 사용자 인터페이스를 담당하는 View 클래스
 * 입력 받기, 출력하기 등의 UI 관련 기능을 처리한다.
 */
class CarView {
  /**
   * 자동차 이름을 입력받는다.
   * @returns {Promise<string>} 입력받은 자동차 이름 문자열
   */
  async inputCarNames() {
    MissionUtils.Console.print(formatCarNamesPrompt());
    const input = await MissionUtils.Console.readLineAsync();
    return input;
  }

  /**
   * 시도할 횟수를 입력받는다.
   * @returns {Promise<string>} 입력받은 시도 횟수 문자열
   */
  async inputAttempts() {
    MissionUtils.Console.print(formatAttemptsPrompt());
    const input = await MissionUtils.Console.readLineAsync();
    return input;
  }

  /**
   * 실행 결과 헤더를 출력한다.
   */
  printResultHeader() {
    MissionUtils.Console.print(formatResultHeader());
  }

  /**
   * 현재 자동차들의 상태를 출력한다.
   * @param {Array} status - 자동차 상태 배열
   * @param {boolean} addEmptyLine - 마지막에 빈 줄을 추가할지 여부
   */
  printCurrentStatus(status, addEmptyLine = true) {
    for (const car of status) {
      MissionUtils.Console.print(formatCarStatus(car.name, car.displayPosition));
    }
    if (addEmptyLine) {
      MissionUtils.Console.print(''); // 빈 줄 추가
    }
  }

  /**
   * 최종 우승자를 출력한다.
   * @param {string[]} winners - 우승자 이름 배열
   */
  printWinners(winners) {
    MissionUtils.Console.print(formatWinners(winners));
  }

  /**
   * 에러 메시지를 출력한다.
   * @param {string} message - 에러 메시지
   */
  printError(message) {
    MissionUtils.Console.print(message);
  }
}

export default CarView;
