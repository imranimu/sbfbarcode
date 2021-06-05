import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BarCart from './src/BarCart.js'
import BarItem from './src/BarItem.js'
import BarProceed from './src/BarProceed.js'
import BarScreen from './src/BarScreen.js'
import ProductType from './src/ProductType.js'
import Login from './src/Login'
import ResetPassword from './src/ResetPassword.js'
import ForgetPassword from './src/ForgetPassword.js'
import OrderDetail from './src/OrderDetail.js'
import ThankScreen from './src/ThankScreen'
import Splash from './src/Splash/Splash.js'
import MyCart from './src/Mycart.js'
import Registration from './src/Registration.js'
import AddMailScreen from './src/AddmailScreen.js'



console.disableYellowBox = true;

const UserHome = createStackNavigator({
  BarScreen: {
    screen: BarScreen,
    navigationOptions: {
      header: null
    }
  },
  AddMailScreen: {
    screen: AddMailScreen,
    navigationOptions: {
      header: null
    }
  },

  BarCart: {
    screen: BarCart,
    navigationOptions: {
      header: null
    }
  },
  BarItem: {
    screen: BarItem,
    navigationOptions: {
      header: null
    }
  },
  BarProceed: {
    screen: BarProceed,
    navigationOptions: {
      header: null
    }
  },
  ProductType: {
    screen: ProductType,
    navigationOptions: {
      header: null
    }
  },
  OrderDetail: {
    screen: OrderDetail, navigationOptions: {
      header: null
    }
  },
  ThankScreen: {
    screen: ThankScreen, navigationOptions: {
      header: null
    }
  },
  MyCart: {
    screen: MyCart, navigationOptions: {
      header: null
    }
  },
  ResetPassword: {
    screen: ResetPassword, navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: 'BarProceed',
  });

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Registration: {
    screen: Registration,
    navigationOptions: {
      header: null
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: 'Login',
  });


const AppNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  LoginNewUser: {
    screen: LoginStack,
    navigationOptions: {
      header: null
    }
  },
  UserHome: {
    screen: UserHome,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'Splash',
  },
);

const App = createAppContainer(AppNavigator);

//console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default App;