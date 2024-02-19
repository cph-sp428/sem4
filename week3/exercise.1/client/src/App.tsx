import './App.css';
import PersonForm from './components/PersonForm';
import PersonTable from './components/PersonTable';
import AddressTable from './components/AddressTable';
import AddressForm from './components/AddressForm';


function App() {
  
  return (
    <div>
      <PersonTable />
      <AddressTable />
      <PersonForm />
      <AddressForm />
    </div>
  )
}

export default App;
