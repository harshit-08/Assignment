import React, { forwardRef, useState } from 'react'
import '../Css/listItem.css'
import { db } from '../firebase'
const ListItem = forwardRef(({ handleUpdate, id, custName, custEmail, product, quantity }, ref) => {


    const [_custName, setCustName] = useState(custName)
    const [_custEmail, setCustEmail] = useState(custEmail)
    const [_product, setProduct] = useState(product)
    const [_quantity, setQuantity] = useState(quantity)
    const [isEditing, setIsEditing] = useState(false)

    const obj = {
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
        handleUpdate(obj)

    }
    //Function to delete an Entry

    const deleteHandler = (id) => {

        db.collection("users").doc(id).delete().then(function () {

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
                        {id}
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
