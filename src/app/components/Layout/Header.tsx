'use client';

import '@/app/components/Layout/Header.css';
import mealsImage from '@/assets/meals.jpg';
import Image from 'next/image';

const Header = (): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div>
        <Image src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  )
}
export default Header;