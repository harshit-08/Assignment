import React, { useState, useEffect } from 'react'
import '../Css/list.css'
import { db } from '../firebase'
import firebase from 'firebase'
import ListItem from '../Components/ListItem'

function List() {
    const [userData, setUserData] = useState([])
    const [id, setId] = useState("")
    const [custName, setCustName] = useState("")
    const [custEmail, setCustEmail] = useState("")
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState("")


    useEffect(() => {

        db.collection("users").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
            setUserData(
                snapshot.docs.map((doc) => ({
                    _id: doc.id,
                    data: doc.data(),

                }))
            )

        );


    }, []);
    // console.log(userData);

    const newOrderHandler = (e) => {

        db.collection('users').add({
            id: id,
            custName: custName,
            custEmail: custEmail,
            product: product,
            quantity: quantity,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setId('')
        setCustName('')
        setCustEmail('')
        setProduct('')
        setQuantity('')
    }
    // if (userData.length != 0) {
    //     console.log(userData.data)
    // }
    const handleUpdate = (input) => {
        console.log(input);
        const snapShot = db.collection('users').where("id", "==", input.id);
        const getDoc = snapShot.get()
            .then(doc => {
                if (doc.exists) {
                    db.collection("users").where("id", "==", id)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                doc.set({
                                    custName: input.custName,
                                    custEmail: input.custEmail,
                                    product: input.product,
                                    quantity: input.quantity,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                })
                            });
                        })
                } else {
                    db.collection('users').add({
                        id: input.id,
                        custName: input.custName,
                        custEmail: input.custEmail,
                        product: input.product,
                        quantity: input.quantity,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }

            })
            .catch(err => {
                console.log(err);
            })


    }

    return (
        <div className="list">
            <input
                type="text"
                placeholder="Enter Id"
                value={id}
                onChange={e => setId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Customer Name"
                value={custName}
                onChange={e => setCustName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Customer Email"
                value={custEmail}
                onChange={e => setCustEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Product"
                value={product}
                onChange={e => setProduct(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)} />
            <button
                type="submit"
                onClick={newOrderHandler}>
                Create New Order
            </button>

            {userData.map(({ _id, data: { id, custName, custEmail, product, quantity } }) => (
                <ListItem key={_id}
                    handleUpdate={handleUpdate}
                    id={id}
                    custName={custName}
                    custEmail={custEmail}
                    product={product}
                    quantity={quantity}
                />
            ))}

        </div>
    )
}

export default List
