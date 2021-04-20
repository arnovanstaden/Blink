import React from 'react';
import { Transition, animated } from "react-spring";

const SlideUp = ({ children, show }) => {
    return (
        <Transition
            items={show}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
            reverse={show}
            delay={200}
            onRest={() =>
                this.setState({
                    show: !show,
                })
            }>
            {(styles, item) =>
                item && <animated.div style={styles}>
                    {children}
                </animated.div>
            }
        </Transition>
    )
}

export default SlideUp
