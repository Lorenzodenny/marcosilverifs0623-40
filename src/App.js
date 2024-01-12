import './App.css';
import MyComponent from './components/Fetch';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      
      <main className='App-header'>
          <MyComponent />
      </main>

      <footer className='bg-dark'>
          <Footer />
      </footer>
    </div>
  );
}

export default App;
