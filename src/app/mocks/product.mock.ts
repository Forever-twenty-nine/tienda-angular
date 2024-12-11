import { Product } from "../models/product.model";

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Gaming Mouse",
        description: "High precision gaming mouse with customizable buttons and RGB lighting.",
        price: 49.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/gaming-mouse.jpg",
        stock: 25
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        description: "Durable mechanical keyboard with tactile switches and backlight.",
        price: 89.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/mechanical-keyboard.jpg",
        stock: 15
    },
    {
        id: 3,
        name: "Wireless Headphones",
        description: "Noise-canceling wireless headphones with high-quality sound.",
        price: 129.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/wireless-headphones.jpg",
        stock: 10
    },
    {
        id: 4,
        name: "4K Monitor",
        description: "Ultra HD 4K monitor with vibrant colors and fast response time.",
        price: 349.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/4k-monitor.jpg",
        stock: 8
    },
    {
        id: 5,
        name: "External SSD",
        description: "Portable external SSD with fast read/write speeds and compact design.",
        price: 119.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/external-ssd.jpg",
        stock: 30
    },
    {
        id: 6,
        name: "Smartphone",
        description: "Latest model smartphone with powerful processor and long battery life.",
        price: 699.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/smartphone.jpg",
        stock: 12
    },
    {
        id: 7,
        name: "Smartwatch",
        description: "Stylish smartwatch with fitness tracking and notification features.",
        price: 199.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/smartwatch.jpg",
        stock: 20
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with high-quality audio and waterproof design.",
        price: 59.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/bluetooth-speaker.jpg",
        stock: 18
    },
    {
        id: 9,
        name: "Drone",
        description: "Compact drone with HD camera and easy-to-use controls.",
        price: 499.99,
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/drone.jpg",
        stock: 5
    },
    {
        id: 10,
        name: "Action Camera",
        description: "Rugged action camera with 4K video recording and wide-angle lens.",
        price: 299.99, 
        quantity: 1,
        imageUrl: "https://storage.cloud.google.com/mis-imagenes-bucket/action-camera.jpg",
        stock: 10
    }
];
