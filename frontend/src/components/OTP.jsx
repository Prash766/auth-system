import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const OTP = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const ref = useRef([]);
  
  function handleChange(value, index) {
    const newCode = [...code];
        if (value.length > 1) {
      handlePaste(value);
    } else {
      newCode[index] = value;
      setCode(newCode);
            if (value && index < 5) {
        ref.current[index + 1].focus();
      }
    }
  }
  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      ref.current[index - 1].focus();
    }
  }
  function handlePaste(pasteData) {
    const pasteCode = pasteData.slice(0, 6).split("");
    const newCode = [...code];
    for (let i = 0; i < pasteCode.length; i++) {
      newCode[i] = pasteCode[i] || "";
    }
    
    setCode(newCode);
    
    const lastFilledIndex = newCode.findIndex((digit) => digit === "");
    const focusIndex = lastFilledIndex !== -1 ? lastFilledIndex : 5;
    ref.current[focusIndex].focus();
  }

  function handleSubmit(e){
    console.log("Code submitted")
  }

  useEffect(()=>{
   if( code.every(digit => digit!==""))
{
    handleSubmit(new Event('onclick'))
}
  },[code])

  return (
    <motion.div className='space-y-8'>
      <motion.div className='flex justify-around'>
        {code.map((digit, index) => (
          <motion.input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (ref.current[index] = el)} // Assign each input element to the ref
            inputMode="numeric"
            maxLength={1} 
            onPaste={(e) => {
              e.preventDefault(); 
              handlePaste(e.clipboardData.getData("Text"));
            }}
            className="w-12 h-12 pl-1 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          />
        ))}
      </motion.div>

      <motion.button
  whileTap={code.every(digit => digit !== "") ? { scale: 0.8 } : {}}
  className={`bg-purple-600 w-full rounded-md p-2 font-semibold text-white ${
    code.every(digit => digit !== "") ? 'hover:bg-purple-700' : 'opacity-50 cursor-default'
  }`}
  disabled={code.every(digit => digit !== "") ? false : true}
>
  Verify
</motion.button>
    </motion.div>
  );
};

export default OTP;
