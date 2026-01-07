import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { id: 1, name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", price: 15 },
                { id: 2, name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters toxins.", price: 12 },
                { id: 3, name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Purifies air.", price: 18 },
                { id: 4, name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Removes toxins.", price: 20 },
                { id: 5, name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy care.", price: 17 },
                { id: 6, name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Healing plant.", price: 14 }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { id: 7, name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming scent.", price: 20 },
                { id: 8, name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance.", price: 18 },
                { id: 9, name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent.", price: 15 },
                { id: 10, name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma.", price: 12 },
                { id: 11, name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Relieves stress.", price: 14 },
                { id: 12, name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Fragrant flower.", price: 22 }
            ]
        }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prev => ({
            ...prev,
            [plant.id]: true
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <button onClick={() => setShowCart(true)}>Cart ({cartItems.length})</button>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(category => (
                        <div key={category.category}>
                            <h2>{category.category}</h2>
                            <div className="plant-grid">
                                {category.plants.map(plant => (
                                    <div className="plant-card" key={plant.id}>
                                        <img src={plant.image} alt={plant.name} />
                                        <h4>{plant.name}</h4>
                                        <p>{plant.description}</p>
                                        <p>${plant.price}</p>
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.id]}
                                        >
                                            {addedToCart[plant.id] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
