import { useEffect, useReducer } from "react";
import Title from "../components/shared/Title";
import homePageReducer from "../Reducers/homePageReducer";
import axios from "axios";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/shared/MessageBox";
import Products from "../components/HomePage/Products";

const initialState = { loading: true, error: "", data: [] };

function HomePage() {

  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const { loading, error, data } = state; 

  useEffect(() => {
     const getProducts = async () => {
       dispatch({type: "GET_REQUEST"});
       try {
        const { data } = await axios.get("http://localhost:5000/api/v1/products");
        dispatch({type: "GET_SUCCESS", payload: data});
       } catch (err) {
        dispatch({type: "GET_FAIL", payload: err.message});
       }
     }

     getProducts();
  }, [])

  return (
    <div>
      <Title title={"Home"} />
      <div className="backgroundHomePage">
        <img style={{width: "100%"}} src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg" alt="backgroundHomePage"/>
      </div>
      <div className="products">
        {
          loading ? <Loading/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
            <div>
              <Products products={data}></Products>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default HomePage;
