import { createContext, useContext,  useState, ReactNode } from "react"
import { useCount } from "@/context/CountContext";

const useCount: () => CountContextProps


interface CountContextProps {
  count: number
  increment: () => void
  decrement: () => void
}

export const CountContext = createContext<CountContextProps | undefined>(undefined)

export const CountProvider = ({ children }: { children: ReactNode}) => {

  const [count, setCount] = useState<number>(0)

  const increment = () => setCount((count ) =>count + 1)
  const decrement = () => setCount((count) => count > 0 ? count - 1 : 0)

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  )
}



export const useCount = () => {
  const context = useContext(CountContext)

  if (!context) {
    throw new Error("useCount must be within a Count Provider")
  }

  return context
}

export default function CounterComponent() {
  const { count, increment, decrement } = useCount();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>➕</button>
      <button onClick={decrement}>➖</button>
    </div>
  );
}

