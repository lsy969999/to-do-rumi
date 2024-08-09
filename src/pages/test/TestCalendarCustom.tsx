import { addDays, format, startOfWeek } from "date-fns"
import { useState } from "react"
import { useGesture } from '@use-gesture/react'
import { animated, useSpring } from "@react-spring/web"

const TestCalendarCustom = () => {
    const [now, setNow] = useState<Date>(new Date())
    const weekOne = startOfWeek(now)
    
    const [style, api] = useSpring(() => ({ x: 0, y:0 }));
    const bind = useGesture(
        {
          onDrag: ({ down, movement: [mx, my] }) => {
            console.log('a', down, mx, my)
            // y 방향으로만 움직임을 감지합니다.
            // api.start({ x: mx, y: my });
    
            // // 스와이프 방향에 따라 콘솔 메시지 출력
            // if (!down) {
            //   if (my < -50) {
            //     console.log('Swiped up');
            //   } else if (my > 50) {
            //     console.log('Swiped down');
            //   }
            // }
          },
        },
        // { drag: { axis: 'y' } } // y 축으로만 드래그를 제한합니다.
      );

      // isExp ? 'month' : 'week'
    const [isExp, setIsExp] = useState(true)

    const expandCalStyles = useSpring({
        height: isExp ? '10rem' : '1.75rem',
        config: {tension: 200, friction: 20}
    })
    //h-[calc(100vh-229px-3.75rem)] 
    const expandTodoStyles = useSpring({
        // paddingTop: isExp ? '0rem' : '10rem',
        height: isExp ? 'calc(100vh - 14rem - 3.75rem)' : 'calc(100vh - 6rem - 3.75rem)',
        config: {tension: 200, friction: 20}
    })

    const handleMonthSpread = () => {
        setIsExp(true)
    }

    const handleMonthFold = () => {
        setIsExp(false)
    }

    const handleNext = () => {
        if (isExp) {
            handleNextMonth()
        } else {
            handleNextWeek()
        }
    }

    const handlePrev = () => {
        if (isExp) {
            handlePrevMonth()
        } else {
            handlePrevWeek()
        }
    }

    const handleNextWeek = () => {

    }

    const handlePrevWeek = () => {

    }

    const handleNextMonth = () => {

    }

    const handlePrevMonth = () => {

    }

    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="flex justify-between">
                        <button onClick={handleMonthSpread}>Spread</button>
                        <button onClick={handleMonthFold}>Fold</button>
                        <button onClick={handleNext}>Next</button>
                        <button onClick={handlePrev}>Prev</button>
                    </div>
                    <animated.div {...bind()} style={{...style}}  className="max-w-sm mx-auto">
                        <div className="flex justify-between">
                            <button> {'<'} </button>
                            <span>8 월</span>
                            <button> {'>'} </button>
                        </div>
                        <div className="">
                            <div>
                                <div className="flex text-center text-sm">
                                    <div className="grow">일</div>
                                    <div className="grow">월</div>
                                    <div className="grow">화</div>
                                    <div className="grow">수</div>
                                    <div className="grow">목</div>
                                    <div className="grow">금</div>
                                    <div className="grow">토</div>
                                </div>
                            </div>
                            <animated.div style={expandCalStyles} className="overflow-hidden">
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                                <div className="flex text-center">
                                    <div className="grow">{format(weekOne, 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 1), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 2), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 3), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 4), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 5), 'd')}</div>
                                    <div className="grow">{format(addDays(weekOne, 6), 'd')}</div>
                                </div>
                            </animated.div>
                        </div>
                    </animated.div>
                </div>
                <div className="border-b"></div>
            </div>
            <animated.div className="overflow-auto " style={expandTodoStyles} >
                {
                    [...Array(122)].map(() => {
                        return <div className="border-b">s</div>
                    })
                }
                
            </animated.div>
        </div>
    )
}

export default TestCalendarCustom