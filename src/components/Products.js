import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { db } from "../utilites/firebase";
import { collection, doc, getDocs, query, setDoc, where, orderBy } from "firebase/firestore";
import Navbar from './Navbar';



export default function Products() {
  const location = useLocation();
  const category = location?.state?.data
  const [products, setProducts] = useState("")
  const [result, setResult] = useState(false)
  const [loading, Setloading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  
  
  const getProducts = () => {


    const q = query(collection(db, "Products"), where("category", "==", category))
    getDocs(q)
      .then((data) => {
        if (!data.empty) {

          var gru = data.docs.map((items => {
            return items.data()
          }))
          console.log(gru);
          setProducts(gru);
          Setloading(false);
          setResult(true);


        } else {
          console.log("no data");
          Setloading(false);
          setNotFound(true);
        }
      })
      .catch((error) => {
        alert("error:" + error);
        Setloading(false);
        setNotFound(true)
      })
  }

  useEffect(() => { getProducts(); }, [])

  return (
    <>
    <Navbar/>
    <div className='container'>
      <div className="row">
        {notFound? <div className='container loading'>
          <h2 className='my-5 '>Products Not Found</h2>
        </div>:null}
        {loading? <div className='container loadbg'>
          <img className='loading' src="../images/cart_loading.gif" alt="" />
        </div>: null}
        {result ? products.map((items, num)=> (
          <div className="col-md-4" key={num}>
            <div className="card">
              <div className="card-header">{items.name}</div>
              <div className="card-body"><img className='imgu' src={items.image} alt="" /></div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
    </>


  )
}
