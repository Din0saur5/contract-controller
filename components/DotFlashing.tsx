import React, { useEffect } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";

const DotFlashing = () => {
    const [animationValues, setAnimationValues] = React.useState([
        new Animated.Value(0), // For the first dot
        new Animated.Value(0), // For the second dot
        new Animated.Value(0), // For the third dot
    ]);

    // Animate the dots one by one
    useEffect(() => {
        const animateDots = () => {
            Animated.sequence([

                Animated.timing(animationValues[0], {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(animationValues[0], {
                    toValue: 0.5,
                    duration: 600,
                    useNativeDriver: false,
                }),


                Animated.timing(animationValues[1], {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(animationValues[1], {
                    toValue: 0.5,
                    duration: 600,
                    useNativeDriver: false,
                }),


                Animated.timing(animationValues[2], {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false,
                }),

                Animated.timing(animationValues[2], {
                    toValue: 0.5,
                    duration: 600,
                    useNativeDriver: false,
                }),
            ]).start();
        };

        // Start the animation loop
        animateDots();
        const interval = setInterval(() => animateDots(), 2100);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [animationValues]);

    // Interpolate the color change for the animation
    const animatedColors = animationValues.map((value) =>
        value.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["#9880ff", "rgba(152, 128, 255, 0.2)", "#9880ff"],
        })
    );

    return (
        <DotContainer>
            {/* Left Dot */}
            <Dot
                style={{
                    backgroundColor: animatedColors[0],
                    transform: [{ translateX: -15 }],
                }}
            />
            {/* Center Dot */}
            <Dot style={{ backgroundColor: animatedColors[1] }} />
            {/* Right Dot */}
            <Dot
                style={{
                    backgroundColor: animatedColors[2],
                    transform: [{ translateX: 15 }],
                }}
            />
        </DotContainer>
    );
};

export default DotFlashing;

// Styled Components for the dots
const DotContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 10%;
  padding-bottom: 2%;

`;

const Dot = styled(Animated.View)`
  position: absolute;
  width: 5px;
  height: 7px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
`;
