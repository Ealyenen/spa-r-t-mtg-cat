import './App.css';
import Header from './components/header/Header';
import Main from './page/Main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import languageReducer from './common/store/languages/reducer';

const store = createStore(languageReducer);

function App() {

  return (
    <Provider store={store}>
      <div>
        <Header />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
