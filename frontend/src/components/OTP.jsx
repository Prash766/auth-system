import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { Loading, useAuthActions } from '../../atoms/Auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { errorState } from '../../atoms/Auth';

const OTP = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const ref = useRef([]);
  const isLoading = useRecoilValue(Loading);
  const { verifyEmail } = useAuthActions();
  const navigate = useNavigate();
  const error = useRecoilValue(errorState);

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

  async function handleSubmit(e) {
    console.log("Code submitted");
    const verificationCode = code.join("");
    try {
      const response = await verifyEmail(verificationCode);
      console.log(response);
      if (response.status === 200) {
        navigate('/');
        toast.success("Email Verified 👍");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (code.every(digit => digit !== "")) {
      handleSubmit(new Event('onclick'));
    }
  }, [code]);

  return (
    <motion.div className='space-y-4'>
      <motion.div className='flex justify-around'>
        {code.map((digit, index) => (
          <motion.input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (ref.current[index] = el)}
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

      {error && (
        <motion.p
          className='text-red-500 font-semibold text-center mt-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <motion.button
        whileTap={code.every(digit => digit !== "") ? { scale: 0.8 } : {}}
        className={`bg-purple-600 w-full rounded-md p-2 font-semibold text-white ${
          code.every(digit => digit !== "") ? 'hover:bg-purple-700' : 'opacity-50 cursor-default'
        }`}
        disabled={code.every(digit => digit !== "") ? false : true}
      >
        {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Verify"}
      </motion.button>
    </motion.div>
  );
};

export default OTP;
