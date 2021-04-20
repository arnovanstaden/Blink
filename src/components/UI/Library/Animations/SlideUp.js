import React from 'react';
import { Transition, animated } from "react-spring";

const SlideUp = ({ children, show }) => {
    const windowHeight = window.innerHeight
    return (
        <Transition
            items={show}
            from={{
                opacity: 0,
            }}
            enter={{
                opacity: 1,
            }}
            leave={{
                opacity: 0,
            }}
            config={{
                duration: 300
            }}
            reverse
        >
            {(styles, item) =>
                item && <animated.div style={styles}>
                    {children}
                </animated.div>
            }
        </Transition>
    )
}

export default SlideUp
