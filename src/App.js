import Header from './components/Header';
import Body from './components/Body';


console.log(process.env.REACT_APP_MARVEL_API_PUBLIC_KEY);

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

export default App;
