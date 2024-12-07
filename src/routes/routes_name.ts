import {Route} from '../constants/route';

class AppRoutes {
  openingScreen: Route;
  login: Route;
  homeScreen: Route;

  constructor() {
    this.openingScreen = Route.OPENING_SCREEN;
    this.login = Route.LOGIN_SCREEN;
    this.homeScreen = Route.HOME_SCREEN;
  }
}

const routes = new AppRoutes();
export default routes;
