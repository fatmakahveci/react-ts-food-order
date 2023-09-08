'use client';

import Header from '@/app/components/Layout/Header';
import Meals from '@/app/components/Meals/Meals';
import './globals.css';

const Home = (): JSX.Element => {
  return (
    <>
    <Header />
    <main>
      <Meals />
    </main>
    </>
  )
}

export default Home;