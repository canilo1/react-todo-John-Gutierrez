import  { useState } from "react";
import PropTypes from 'prop-types'; // ES6 import
import InputWithLabel from "./InputWithLabel";

function AddToDoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState("");
    const [visibility, setVisibility] = useState(0.5);
    const [TheColor, setColor] = useState([]);

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            title: todoTitle,
            id: Date.now()
        };
        onAddTodo(newTodo);
        setTodoTitle('');
    };

    const toggleOpacityAnimation = () => {
        setVisibility(1);
    };

    const mouseLeft = () => {
        setVisibility(0.5);
    };

    const RightChange = () => {
        console.log("I right clicked!");
        const color1 = Math.ceil(Math.random() * 255);
        const color2 = Math.ceil(Math.random() * 255);
        const color3 = Math.ceil(Math.random() * 255);
        console.log("these are the colors", color1, color2, color3);
        const ColorValue = `rgb(${color1},${color2},${color3})`;
        setColor(ColorValue);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}/>
            <button 
                onMouseEnter={toggleOpacityAnimation} 
                onMouseLeave={mouseLeft} 
                className="fadeincontainer"
                style={{ opacity: visibility, color: TheColor }} 
                onContextMenu={RightChange}
                onClick={RightChange}
            >
                Add
            </button>
        </form>
    );
}

AddToDoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddToDoForm;
