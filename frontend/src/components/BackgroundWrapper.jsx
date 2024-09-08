import React from 'react';
import FloatingObject from './FloatingObject';
import BouncingObject from './BouncingObject';

const BackgroundWrapper = ({ children }) => (
  <div className='relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 overflow-hidden'>
    <FloatingObject
      start={0}
      end={0}
      color={'#8B5CF6'}
      size={150}
      initialPosition={{ x: "5%", y: "10%" }}
      randomPosition={200}
    />
    <FloatingObject
      start={-3}
      end={0}
      color={'#EC4899'}
      size={100}
      initialPosition={{ x: "90%", y: "20%" }}
      randomPosition={400}
    />
    <BouncingObject size={60} color="#F472B6" initialPosition={{ x: '15%', y: '40%' }} />
    <FloatingObject
      start={-150}
      end={window.innerWidth + 150}
      color={'#818CF8'}
      size={75}
      initialPosition={{ x: "50%", y: "30%" }}
      randomPosition={200}
    />
    <FloatingObject
      start={20}
      end={30}
      color={'#FBBF24'}
      size={120}
      initialPosition={{ x: "50%", y: "50%" }}
      randomPosition={25}
    />
    <FloatingObject
      start={-250}
      end={window.innerWidth + 250}
      color={'#F43F5E'}
      size={90}
      initialPosition={{ x: "40%", y: "70%" }}
      randomPosition={350}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

export default BackgroundWrapper;
