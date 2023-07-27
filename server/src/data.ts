import bcrypt from 'bcryptjs';
import { User } from './models/userModel';
import { Product } from './models/productModel';

export const sampleProducts: Product[] = [
  {
    name: 'Coding Club Merch',
    slug: 'coding-club-merch',
    category: 'Shirts',
    image: '../images/merch1.jpg',
    price: 120,
    countInStock: 10,
    brand: 'CodingClub',
    rating: 4.5,
    numReviews: 10,
    description: 'high quality shirt',
  },
  {
    name: 'E Cell Merch',
    slug: 'e-cell-merch',
    category: 'Shirts',
    image: '../images/merch2.jpg',
    price: 100,
    countInStock: 20,
    brand: 'ECell',
    rating: 4.0,
    numReviews: 10,
    description: 'high quality product',
  },
  {
    name: 'Lohit Hostel Jersey',
    slug: 'lohit-hostel-jersey',
    category: 'Pants',
    image: '../images/merch3.jpg',
    price: 220,
    countInStock: 0,
    brand: 'LohitHostel',
    rating: 4.8,
    numReviews: 17,
    description: 'high quality product',
  },
  {
    name: 'Cepstrum Hoodie',
    slug: 'cepstrum-hoodie',
    category: 'Pants',
    image: '../images/merch4.jpg',
    price: 78,
    countInStock: 15,
    brand: 'Cepstrum',
    rating: 4.5,
    numReviews: 14,
    description: 'high quality product',
  },
];

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'Mamu',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];
