import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

// List of tooltips to display
const tips = [
    "Adding questions or statements in the comments of your lessons will create flashcards under the review tab answering/including that content.",
    "You have 3 days to complete head-to-head pop quizzes before they expire.",
    "Complete lessons to earn unique badges!",
    "You can use your XP to _____",
    "Steve, the founder of UpskillHero, suggested that he run through NYC naked as a marketing campaign.",
    "You can subscribe to other profiles you find interesting or relate to through your feed.",
    "Any time you comment, your personal tutor will learn something new about you.",
    "Did you know the original idea for UpskillHero included a map like PokemonGo?",
    "Keep up a daily streak to maximize your XP earning potential!",
    "Dan, the head of community of UpskillHero, was convicted for having a rocket launcher.",
    "Brave adventurer, each step you take is one closer to legendary greatness!",
    "Even the mightiest heroes start small. Your quest is just beginning!",
    "Every challenge conquered is another jewel in your crown of wisdom!",
    "The map to mastery is revealed one clue at a time—keep exploring!",
    "You’re forging the sword of knowledge. Each lesson makes it sharper!",
    "Heroes stumble, but they always rise again. Dust off and press on!",
    "Your journey through the realms of learning is what makes you unstoppable!",
    "The treasure of success is near—just follow the glowing path of effort!",
    "Each comment, each lesson, each streak—another badge of honor earned!",
    "You're the chosen one, destined to unlock the secrets of UpskillHero!",
];

const TooltipSlider = () => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current; // Persist Animated.Value across renders
    useEffect(() => {
        setCurrentTipIndex((prevIndex) => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * tips.length);
            } while (newIndex === prevIndex);
            return newIndex;
        });
    }, [])
    // Function to change the tip and animate the fade
    const changeTip = () => {

        Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            // randomize and Update the tip after fade-out
            setCurrentTipIndex((prevIndex) => {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * tips.length);
                } while (newIndex === prevIndex);
                return newIndex;
            });
            // Fade in the new tip
            Animated.timing(fadeAnim, {
                toValue: 0.5, // Fade in
                duration: 150,
                useNativeDriver: true,
            }).start(() => {

                // Fade in the new tip
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fade in
                    duration: 150,
                    delay: 150,
                    useNativeDriver: true,
                }).start()

            });
        });
    }
    useEffect(() => {

        const interval = setInterval(changeTip, 9000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TooltipContainer>
            <TooltipText>
                <Animated.Text style={{ opacity: fadeAnim }}>
                    {tips[currentTipIndex]}
                </Animated.Text>
            </TooltipText>
        </TooltipContainer>
    );
};

export default TooltipSlider;


const TooltipContainer = styled.View`
 
  padding: 10px;
`;

const TooltipText = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
  font-family: 'Roboto'; // Use a default font if BG_Regular is not found
  line-height: 24px;
  max-width: 80%; // Prevent text from overflowing
`;
