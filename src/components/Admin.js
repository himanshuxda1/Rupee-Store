import React, { useEffect, useState } from 'react'
import { db } from '../utilites/firebase'
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
  } from "firebase/firestore";


export default function Admin() {

    // States to be used
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescrioption] = useState("")
    const [category, setCategory] = useState("")
    const [load, setLoad] = useState(false)


    const checker = () => {
        if (name === "" || price === "" || description === "" || category === "") {
            alert("something is empty ")
        } else {
            submitb()
        }
    }
    const setNames = (e) => {
        setName(e.target.value)
    }

    const setPrices = (e) => {
        setPrice(e.target.value)
    }

    const setDescriptions = (e) => {
        setDescrioption(e.target.value)
    }

    const setCategorys = (e) => {
        setCategory(e.target.value)
        console.log(e.target.value);
    }

    const submitb = (e) => {
        setLoad(true)
        const prodCollection = collection(db, "Products");
        const prodID = Math.random().toString(36).substring(2);
        const prodDoc = doc(prodCollection, prodID);
        setDoc(prodDoc, {
            id: prodID,
            name: name,
            price: price,
            description: description,
            category: category,
            image: ''
        })
            .then(() => {
                setLoad(false)
                alert("Product Saved!!");
            })
            .catch((error) => {
                setLoad(false)
                alert("Error adding user data: ", error);
            });
   


    }
    // useEffect(()=>{
    //     checker();
    // }, [name, price, description, category])

    return (
        <div className='container'>
            <h3 className='my-5'>Welcome Admin</h3>
            {load? <h1>Working</h1> : null}
            <form >
                <div className="row">
                    <div className="col-md-6 my-3">
                        <div className="mb-3 d-flex">
                            <label htmlFor="exampleInputEmail1" className="form-label mx-2 wrap">
                                Name/Title
                            </label>
                            <input
                                onChange={setNames}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                    </div>

                    <div className="col-md-6 my-3">
                        <div className="mb-3 d-flex">
                            <label htmlFor="exampleInputPassword1" className="form-label wrap mx-2">
                                Price
                            </label>
                            <input
                                onChange={setPrices}
                                type="number"
                                className="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>
                    </div>

                    <div className="col-md-6 my-3">
                        <div className="mb-3 d-flex ">
                            <label className="form-label wrap mx-2" htmlFor="exampleCheck1">
                                Description
                            </label>
                            <textarea onChange={setDescriptions} type="text" className="form-control " id="exampleCheck1" />
                        </div>
                    </div>
                    <div className="col-md-6 my-3">
                        <div className='mb-3 d-flex'>
                            <label htmlFor="" className="form-label wrap mx-2">Category</label>
                            <select onChange={setCategorys} className='form-select' name="" id="">
                                <option value="" className='disabled text-center'>Select a category</option>
                                <option value="Men's Fashion">Men's Fashion</option>
                                <option value="Women's Fashion">Women's Fashion</option>
                                <option value="Electronics ">Electronics</option>
                                <option value="Books">Books</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Image</label>
                        <input className='' type="file" />
                    </div>

                </div>
                <button onClick={() => { checker(); }} type="button" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}
