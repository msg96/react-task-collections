import { Provider } from "@/Configs/Provider";
import Rotas from "@/Configs/Routes";
const App = (props) => {
  return (
    <Provider>
      <Rotas />
    </Provider>
  );
};

export default App;
