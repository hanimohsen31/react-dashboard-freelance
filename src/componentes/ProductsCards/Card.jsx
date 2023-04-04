import React from 'react'

export const Card = (props) => {
  return (
    <div className='Card col-md-6 col-xl-4 mb-5'>
        <div className="card border-0 text-end">
        <img className="card-img" style={{height:"400px" , objectFit:"cover"}} src={props.product.image} alt="CardImg" />
        <div className="card-img-overlay">
            <h5 className="card-title text-light">{props.product.name}</h5>
            <p className="card-text text-light">{JSON.parse(props.product.category).name}</p>
            <p className="card-text text-light">{props.product.description}</p>
            <p className="card-text text-light">{props.product.price} L.E</p>
        </div>
        </div>
    </div>
  )
}
