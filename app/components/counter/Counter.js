"use client";
import withAuth from "../withAuth";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import { Button } from 'react-bootstrap'

/**
 * Counter component that displays the current count and provides buttons to increment or decrement the count.
 *
 * @returns {JSX.Element}
 */
const Counter = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div className='box' >
            <p className='count'><span>Count: </span>{count}</p>
            <div className=' btn ' >
                <Button onClick={() => dispatch(increment())} >Add</Button>
                <Button onClick={() => dispatch(decrement())} >Subtract</Button>
            </div>
        </div>
    )
}

export default withAuth(Counter);
