import React from 'react';
import { motion } from 'framer-motion';
import BackgroundWrapper from './BackgroundWrapper';

const SkeletonInput = () => (
  <div className="w-full h-12 bg-white bg-opacity-20 rounded-md animate-pulse" />
);

const SkeletonButton = () => (
  <div className="w-full h-12 bg-purple-600 bg-opacity-50 rounded-md animate-pulse" />
);

const AuthSkeleton = () => (
  <motion.div
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md relative overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 opacity-30"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <div className="relative z-10">
      <motion.div
        className="h-8 w-3/4 bg-white bg-opacity-20 rounded mb-8 mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <div className="space-y-6">
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonButton />
      </div>
      <div className="mt-6 flex justify-center">
        <div className="w-3/4 h-4 bg-white bg-opacity-20 rounded" />
      </div>
    </div>
  </motion.div>
);

const Skeleton = () => (
  <BackgroundWrapper>
    <AuthSkeleton />
  </BackgroundWrapper>
);

export default Skeleton;
