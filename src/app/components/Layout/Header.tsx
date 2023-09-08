'use client';

import './Header.css';
import mealsImage from '@/assets/meals.jpg';
import Image from 'next/image';
import HeaderCartButton from './HeaderCartButton';

const Header = (): JSX.Element => {
  return (
    <>
      <header className="header">
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className="main-image">
        <Image src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  )
}
export default Header;