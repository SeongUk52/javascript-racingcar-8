import CarController from './controllers/CarController.js';

class App {
  async run() {
    const carController = new CarController();
    await carController.run();
  }
}

export default App;
