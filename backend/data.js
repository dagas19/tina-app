import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Basir",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike slim shirt",
      image: "/images/p1.jpg",
      category: "Shirts",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 4.5,
      numReviews: 10,
      description: " high quality product",
    },
    {
      name: "Adidas slim shirt",
      image: "/images/p2.jpg",
      category: "Shirts",
      price: 120,
      countInStock: 0,
      brand: "nike",
      rating: 4,
      numReviews: 10,
      description: " high quality product",
    },
    {
      name: "Nike tough shirt",
      image: "/images/p3.jpg",
      category: "Shirts",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 5,
      numReviews: 10,
      description: " high quality product",
    },
    {
      name: "Nike slim trousers",
      image: "/images/p4.jpg",
      category: "Pants",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 5,
      numReviews: 10,
      description: " high quality product",
    },
    {
      name: "Nike slim pants",
      image: "/images/p5.jpg",
      category: "Pants",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 2,
      numReviews: 10,
      description: " high quality product",
    },
    {
      name: "Nike slim shorts",
      image: "/images/p6.jpg",
      category: "Pants",
      price: 120,
      countInStock: 10,
      brand: "nike",
      rating: 5,
      numReviews: 10,
      description: " high quality product",
    },
  ],
};

export default data;
