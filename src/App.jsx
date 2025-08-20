import Header from "./components/header/Header";
import Menu from "./components/Menu/Menu";
import "./App.css"; 

export default function App() {
  return (
    <>
      <Header />
      <div>
        <hr className="hr-line" />
      </div>
      <Menu /> 
    </>
  );
}
