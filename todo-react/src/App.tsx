import "./App.css";
import AddNewPopup from "./components/AddNewPopup.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import OrderedList from "./components/OrderedList.tsx";

function App(props) {
  return (
    <>
      <Header />
      <OrderedList />
      <AddNewPopup />
      <Footer />
    </>
  );
}

export default App;
