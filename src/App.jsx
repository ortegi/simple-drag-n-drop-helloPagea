import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem('todos') || [
  {id: 1, text: "Aprender React.js"},
  {id: 2, text: "Aprender JS"},
  {id: 3, text: "Aprender Vue.js"},
])

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect( () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log(`'prueba`)
  }, [todos])


  const handleDragEnd = (result) => {
    if(!result.destination) return
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyArray = [...todos]
    const [reorderedItem ]= copyArray.splice(startIndex, 1)
    copyArray.splice(endIndex, 0, reorderedItem)
    setTodos(copyArray)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-slate-800 text-white ">
        <h1 className="tracking-wide font-mono pt-3 text-center text-2xl">
          Todo App 😎
        </h1>
        <Droppable droppableId="todos">
          {(droppableProvider) => (
            <ul
              className="flex flex-col items-center"
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
                  {(draggableProvider) => (
                    <li className="border-white border-2 mt-4 w-3/5 p-3"
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                    >
                      {todo.text}{" "}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;
