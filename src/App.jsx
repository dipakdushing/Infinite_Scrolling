//import logo from './logo.svg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

function App() {
  const [items,setItems] = useState([]);
  const [more , setMore] = useState(true);
  const [page,setPage] = useState(2);

  useEffect(()=> {
    const getData = async () => {
         const res = await fetch(
           `http://localhost:8080/data?_page=1&limit=10`
         );
         const data = await res.json();
         setItems(data);
    }
    getData();

  },[]);

  const fetchComments = async () => {
   const res = await fetch(
     `http://localhost:8080/data?_page=${page}&limit=10`
   );
   const data = await res.json();
   return data;
  }

  const fetchData = async () => {
    const ItemsDetails = await fetchComments();

    setItems([...items , ...ItemsDetails]);

    if(ItemsDetails.length === 0 || ItemsDetails.length<10){
      setMore(false);
    }
    
    setPage(page+1);
  }

  return (
    <div className="App">
      
    <InfiniteScroll
       className="d1"
      dataLength={items.length} 
      next={fetchData}
      hasMore={more}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <h1>INFINITE SCROLL-UP</h1>
      <div>
       {items.map((elem) => {
        return <div key={elem.id} className="d2" >
        {elem.completed === true ? <div className='green'>{elem.id}</div> : <div className='red'>{elem.id}</div>}  
         <div style={{fontSize:"18px", fontWeight:"bolder"}}>{elem.title}</div>
        
        </div>
      })}

    </div>
     
</InfiniteScroll>
  </div>
   
  );
}

export default App;
