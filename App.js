import { StyleSheet } from 'react-native';
import AlleUitgaven from './screens/AlleUitgaven';

export default function App() {
  return (
    <AlleUitgaven />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
