'use strict';

import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { db } from "../utilites/firebase";
import { collection, doc, getDocs, query, setDoc, where, orderBy } from "firebase/firestore";
import Navbar from "./Navbar";
import "./textstyle.css"
export default function Home() {

    //States to be used
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [load, setload] = useState(true);

    useEffect(() => { getCategoies(); getProducts() }, [])

    const getCategoies = () => {
        setload(true)
        const q = query(collection(db, "categories"))
        getDocs(q)
            .then((data) => {
                if (!data.empty) {

                    var gru = data.docs.map((items => {
                        return items.data()
                    }))
                    console.log(gru);
                    setload(false)
                    setCategories(gru)


                } else {
                    setload(false)
                    alert("no data")
                }
            })
            .catch((error) => {
                setload(false)
                alert("bamboo", error)
            })
    }

    const getProducts = () => {
        const p = query(collection(db, "Products"), orderBy("name", "asc"));
        getDocs(p)
            .then((products) => {
                if (!products.empty) {
                    var gru = products.docs.map((items) => {
                        return items.data()
                    })
                    console.log(gru);
                    setProducts(gru);
                }
            })
    }

    return (
        <>
        <Navbar/>
        <div className="container">
            {load? null : <h3 className="text-start mb-4">Categories</h3>}
            <div className="row">
                {load ? <div className="container">
                    <img className="loading" src="../images/cart_loading.gif" alt="" />
                </div> :  null}               
                {categories?.length !== 0 ? categories.map  ((items, num) => (
                    <Link to={"/products"} state={{data:items.name}} key={num} className="col-md-3 mb-5 nostyle">
                        <div className  ="card">
                            <div className="card-body bod">
                                <img className="img-responsive imgu" src={items.image} alt="" />
                                <div className="text-center my-2">{items.name}</div>
                            </div>
                        </div>
                    </Link>
                )) : null}
            </div>
            {load? null : <h3 className="text-start mb-4">Browse Products</h3>}
            <div className="row">
                {products?.length !== 0 ? products.map((items, num) => (
                    <div key={num} className="col-md-3 my-2">
                        <div className="card">
                            <div className="card-body">
                                <img className="img-responsive imgus" src={items.image} alt="" />
                            {/* <h5 className="titleText" >{items.name.substring(0,50) }{items.name.length>50 ? '...':null}</h5> */}
                            <h5 className="titleText" >{items.name.length>50 ? `${items.name.substring(0,50)}...` : items.name.substring(0,50)}</h5>

                            <div className="row">
                                    <div className="col-md-6 ">
                                    <h5>&#8377;{items.price}</h5>
                                    </div>
                                </div>
                            </div>
                            
                                
                            
                        </div>
                    </div>

                )) : null}
            </div>
                


        </div>
        </>

    );
}
