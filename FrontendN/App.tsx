import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './src/navigation/AppStack';
import { registerRootComponent } from 'expo';

function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;