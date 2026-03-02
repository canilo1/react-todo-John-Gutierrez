import  { useRef, useEffect } from "react";


function InputWithLabel({ id, name, todoTitle, handleTitleChange, children }) {
  console.log(id,name,todoTitle,handleTitleChange,children)
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        name={name}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}

export default InputWithLabel;
