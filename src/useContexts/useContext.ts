import { createContext, useContext } from "react";

type CountType = number

interface ICounterContext {
    count: CountType,
    setCount: (count: CountType) => void
}

export const CounterContext = createContext<ICounterContext | null>(null)

export function useCountContext() {
    const countContext = useContext(CounterContext)
    console.log(countContext, 'count')

    if (countContext === null) {
        throw new Error("Count must not be null")
    }
    return countContext
}