'use strict';

import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { db } from "../utilites/firebase";
import { collection, doc, getDocs, query, setDoc, where, orderBy } from "firebase/firestore";
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
        <div className="container">
            <div className="row">
                {load ? <div className="container">
                    <img className="loading" src="../images/cart_loading.gif" alt="" />
                </div> :  null}               
                {categories?.length !== 0 ? categories.map  ((items, num) => (
                    <Link to={"/products"} state={{data:items.name}} key={num} className="col-md-3 my-3 nostyle">
                        <div className  ="card">
                            
                            <div className="card-body bod">
                                <img className="img-responsive imgu" src={items.image} alt="" />
                                <div className="text-center my-2">{items.name}</div>
                            </div>
                        </div>
                    </Link>
                )) : null}
            </div>
            <div className="row">
                {products?.length !== 0 ? products.map((items, num) => (
                    <div key={num} className="col-md-4 my-2">
                        <div className="card">
                            <div className="card-header">{items.name.substring(0,125)}</div>
                            <div className="card-body">
                                <img className="img-responsive imgus" src={items.image} alt="" />
                            </div>
                        </div>
                    </div>

                )) : null}
            </div>
                


        </div>
    );
}
