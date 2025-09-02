import { useCountContext } from "../useContexts/useContext"

export const Counter = () => {
    const count = useCountContext()
    return (
        <span>
            Count is {count.count}
        </span>
    )
}