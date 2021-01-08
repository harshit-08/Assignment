import React, { useState, useEffect } from 'react'
import '../Css/list.css'
import { db, addList } from '../firebase'
import firebase from 'firebase'
import ListItem from '../Components/ListItem'

function List() {
    const [userData, setUserData] = useState([])
    const [orderID, setOrderId] = useState("")
    const [custName, setCustName] = useState("")
    const [custEmail, setCustEmail] = useState("")
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState("")

    let key = 0;
    const getKey = () => {
        return key++;
    }

    useEffect(() => {
        console.log('component mounted');
        addList()
    }, [])


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


    const newOrderHandler = (e) => {
        if (custName.trim().length !== 0 && custEmail.trim().length !== 0 && product.trim().length !== 0 && quantity.trim().length !== 0) {
            db.collection('users').add({
                orderID: orderID,
                custName: custName,
                custEmail: custEmail,
                product: product,
                quantity: quantity,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            setCustName('')
            setCustEmail('')
            setProduct('')
            setQuantity('')
            setOrderId('')
        } else {
            alert("Please enter all fields")
        }

    }

    const handleUpdate = (input) => {

        const snapShot = db.collection('users').doc(input.id);
        const getDoc = snapShot.get()
            .then(doc => {
                if (doc.exists) {

                    db.collection("users").doc(input.id).update({
                        orderID: input.orderID,
                        custName: input.custName,
                        custEmail: input.custEmail,
                        product: input.product,
                        quantity: input.quantity,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })


                } else {
                    db.collection('users').add({
                        orderID: input.orderID,
                        custName: input.custName,
                        custEmail: input.custEmail,
                        product: input.product,
                        quantity: input.quantity,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    console.log("Does not exist");
                }

            })

            .catch(err => {
                alert("Something went wrong. Please try again")
                console.log(err);
            })


    }

    return (
        <div className="list">
            <input type="text"
                placeholder="Enter Order ID"
                value={orderID}
                onChange={e => setOrderId(e.target.value)}
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

            {userData.map(({ _id, data: { orderID, custName, custEmail, product, quantity } }) => (
                <ListItem key={getKey()}
                    handleUpdate={handleUpdate}
                    orderID={orderID}
                    id={_id}
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
