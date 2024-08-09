import { useSpring, animated } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useState } from "react"

const TestGesture = () => {
    const [{x, y}, api] = useSpring(() => ({x: 0, y: 0}))
    const [w, setW] = useState(0)

    const bind = useGesture({
        onDrag: ({down, movement:[mx, my]}) => {
            const width = document.querySelector('body')!.clientWidth 
            if (w >= width || w <= -width) {
                setW(0)
                x.set(0)
                return;
            }
            api.start({x: down ? mx + w : w, y: down ? my : 0})
            if(!down) {
                // console.log('release')
                if (mx > 50) {
                    // console.log('move left')
                    setW(width + w)
                    api.start({ x: width + w });
                    
                }
                if (mx < -50) {
                    // console.log('move right')
                    setW(w - width)
                    api.start({ x: w - width });
                }
            }
        },
    }, { drag: { axis: 'x' } })
    return (
        <div>
            <nav>TestGesture</nav>
            <div>
                <div className="overflow-hidden">
                    <animated.div {...bind()} style={{x, y, transform: `translate(-40%)`, userSelect: 'none', touchAction: 'none',}} className="flex w-[500%]  ">
                        <div className="bg-indigo-200 w-full">z1</div>
                        <div  className="bg-indigo-200 w-full">z2</div>
                        <div  className="bg-indigo-200 w-full">z3</div>
                        <div  className="bg-indigo-200 w-full">z4</div>
                        <div  className="bg-indigo-200 w-full">z5</div>
                    </animated.div>
                </div>
            </div>
        </div>
    )
}

export default TestGesture