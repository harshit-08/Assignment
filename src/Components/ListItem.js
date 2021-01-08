import React, { forwardRef, useEffect, useState } from 'react'
import '../Css/listItem.css'
import { db } from '../firebase'
const ListItem = forwardRef(({ handleUpdate, orderID, id, custName, custEmail, product, quantity }, ref) => {
    const [_orderID, setOrderID] = useState('')
    const [_custName, setCustName] = useState('')
    const [_custEmail, setCustEmail] = useState('')
    const [_product, setProduct] = useState('')
    const [_quantity, setQuantity] = useState(quantity)
    const [isEditing, setIsEditing] = useState(false)



    var docRef = db.collection("users").where('orderID', '==', orderID);
    docRef.get()
        .then(function (doc) {
            if (doc.exists) {
                setOrderID(doc.orderID)
                setCustName(doc.custName)
                setCustEmail(doc.custEmail)
                setProduct(doc.product)
                setQuantity(doc.quantity)
            } else {
                setOrderID(orderID)
                setCustName(custName)
                setCustEmail(custEmail)
                setProduct(product)
                setQuantity(quantity)

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });






    const obj = {
        orderID: _orderID,
        id: id,
        custName: _custName,
        custEmail: _custEmail,
        product: _product,
        quantity: _quantity
    }

    // Function to toggle between editing and updated state

    const toggleHandler = () => {
        setIsEditing(!isEditing)
    }
    //Function to update an Entry

    const updateHandler = (e) => {
        e.preventDefault()
        toggleHandler()
        console.log(obj);
        handleUpdate(obj)

    }
    //Function to delete an Entry

    const deleteHandler = (id) => {

        db.collection("users").doc(id).delete().then(() => {

        }).catch((error) => {
            console.log(error);
        });

    }

    return (


        <div className="listItem">

            {/* Conditionally rendering to toggle between editing and edited state */}

            {isEditing ? <form onSubmit={updateHandler} className="listItem__ul">
                <input
                    type="text"
                    defaultValue={orderID}
                    onChange={(e) => { setOrderID(e.target.value) }}
                />
                <input
                    type="text"
                    defaultValue={custName}
                    onChange={(e) => { setCustName(e.target.value) }}
                />
                <input
                    type="text"
                    defaultValue={custEmail}
                    onChange={(e) => { setCustEmail(e.target.value) }}
                />
                <input
                    type="text"
                    defaultValue={product}
                    onChange={(e) => { setProduct(e.target.value) }}

                />
                <input
                    type="text"
                    defaultValue={quantity}
                    onChange={(e) => { setQuantity(e.target.value) }}
                />
                <button
                    type="submit">
                    Update
                 </button>

            </form> :
                <ul className="listItem__ul">

                    <li>
                        {orderID}
                    </li>
                    <li>
                        {custName}
                    </li>
                    <li>
                        {custEmail}
                    </li>
                    <li>
                        {product}
                    </li>
                    <li>
                        {quantity}
                    </li>
                    <button type="submit" onClick={() => { deleteHandler(id) }}>Delete</button>
                    <button type="submit" onClick={toggleHandler} >Edit</button>
                </ul>}

        </div>
    )
})

export default ListItem
