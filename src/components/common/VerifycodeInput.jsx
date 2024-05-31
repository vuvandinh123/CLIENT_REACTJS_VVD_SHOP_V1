import { useEffect, useRef, useState } from "react";

const VerificationCodeInput = ({codeValues, setCodeValues}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[currentIndex])
      inputRefs.current[currentIndex].focus();
  }, [currentIndex]);
  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const newCodeValues = [...codeValues];
    // Xử lý khi nhập vào ô đã có giá trị
    if (index === 0 && value.length === 6) {
      const code = value.slice(0, codeValues.length);
      for (let i = 0; i < codeValues.length; i++) {
        newCodeValues[i] = code[i];
      }
    } else {
      newCodeValues[index] = value[value.length - 1] || "";
      // Xử lý khi nhập xong ô cuối cùng hoặc ô trống
      if (currentIndex < codeValues.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    setCodeValues(newCodeValues);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !event.target.value) {
      const prevIndex = index === 0 ? codeValues.length - 1 : index - 1;
      setCurrentIndex(prevIndex);
    }
  };
  return codeValues.map((value, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      className="px-2 py-2 w-14 text-center text-xl rounded-lg border outline-blue-500"
      maxLength={index === 0 ? undefined : 2}
      value={value}
      onChange={(event) => handleInputChange(event, index)}
      onFocus={() => setCurrentIndex(index)}
      onKeyDown={(event) => handleKeyDown(event, index)}
      autoFocus={index === currentIndex}
    />
  ));
};

export default VerificationCodeInput;
