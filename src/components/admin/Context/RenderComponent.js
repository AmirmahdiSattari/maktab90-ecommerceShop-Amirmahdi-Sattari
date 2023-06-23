import { createContext,useState } from "react";


// Create a context object
export const MyContext = createContext();

// Define a component that provides the context
export function MyContextProvider({ children }) {
  // Define the state variable using useState hook
  const [myState, setMyState] = useState('default');

  // Define a function to update the state variable
  function updateMyState(newState) {
    setMyState(newState);
  }

  // Define the context value that will be exposed to child components
  const contextValue = {
    myState,
    updateMyState,
  };

  // Render the child components with the context provider
  return (
    <MyContext.Provider value={contextValue}>
      { children }
    </MyContext.Provider>
  );
}