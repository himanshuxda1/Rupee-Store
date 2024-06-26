import React, { useEffect, useState } from 'react'
import { storage, db } from '../utilites/firebase'
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import Navbar from './Navbar';


export default function Admin() {

    // States to be used
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescrioption] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [load, setLoad] = useState(false)


    const checker = () => {
        if (name === "" || price === "" || description === "" || category === "" || image === "") {
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
    const setImages = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setImage(file); // Set the selected file as the value of the image state
        console.log(file);
        console.log(e.target.value);
    }

    const submitb = async () => {
        setLoad(true);
        const prodCollection = collection(db, "Products");
        const prodID = Math.random().toString(36).substring(2);
        const prodDoc = doc(prodCollection, prodID);


        // Upload image to Firebase Storage
        const storageRef = ref(storage, `Products/${prodID}`);
        await uploadBytes(storageRef, image);

        // Get download URL of the uploaded image
        const imageURL = await getDownloadURL(storageRef);

        setDoc(prodDoc, {
            id: prodID,
            name: name,
            price: price,
            description: description,
            category: category,
            image: imageURL,
        })
            .then(() => {
                setLoad(false)
                if (load === false) { alert("Product Saved!!"); }

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
        <>
            <Navbar />

            <div className='container'>
                <h3 className='my-5'>Welcome Admin</h3>
                {load ? <div className='container'><img src="../images/spinner.gif" alt="" /></div> : null}
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
                            <input onChange={setImages} className='form-control' type="file" accept="image/*" />
                        </div>

                    </div>
                    <button onClick={() => { checker(); }} type="button" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}
