import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { Animated, View, Modal, Image, Text, StyleSheet } from "react-native";
import DotFlashing from "./DotFlashing";
import TooltipSlider from "./TipCycle";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  estimatedTime: number;
  headerText: string;

}
const LoadingModal = ({
  visible,
  estimatedTime,
  headerText,

  setVisible,
}: IProps) => {


  const videoSource = 'https://atjycrgmblfzyzxmmrca.supabase.co/storage/v1/object/sign/avatars/loading%20screen%20improved%20v3%20-%20Made%20with%20Clipchamp.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2xvYWRpbmcgc2NyZWVuIGltcHJvdmVkIHYzIC0gTWFkZSB3aXRoIENsaXBjaGFtcC5tcDQiLCJpYXQiOjE3MzcwODczMTIsImV4cCI6MTczNzY5MjExMn0.fFehK79v1zd6IInGQHGxSJr8xBAaI6v_TQthu1uS4KM&t=2025-01-17T04%3A15%3A12.711Z'

  useEffect(() => {
    if (visible) {
      let startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const percentage = Math.min((elapsedTime / estimatedTime) * 100, 100);



        if (percentage >= 100) {
          clearInterval(interval);
          setVisible(false);
        }
      }, 100);


    }
  }, [visible, estimatedTime, setVisible]);


  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play()

  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <ModalBackground>
        <ActivityIndicatorWrapper>


          <HeaderText>{headerText}<DotFlashing /></HeaderText>


          <Videocontainer>
            <VideoView style={styles.video} player={player} contentFit={'contain'} nativeControls={false} allowsPictureInPicture />
          </Videocontainer>
          <Text style={{ fontSize: 32, marginBlockStart: '-10%' }} >💡</Text>
          <TooltipSlider />
        </ActivityIndicatorWrapper>
      </ModalBackground>
    </Modal>
  );
};

export default LoadingModal;




// Styled components


const styles = StyleSheet.create({

  video: {
    width: 351,
    height: 300,

  },
});

const Videocontainer = styled.View`
margin-block-start: -10%;
`

const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ActivityIndicatorWrapper = styled.View`
  background-color: #ffffff;
  height: 55%;
  width: 90%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  elevation: 5; /* Adds shadow on Android */
  shadow-color: #000; /* Shadow color for iOS */
  shadow-offset: { width: 0, height: 20 }; /* Shadow offset for iOS */
  shadow-opacity: .7; /* Shadow opacity for iOS */
  shadow-radius: 20px; /* Shadow blur radius for iOS */

`;


const HeaderText = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: BG_Bold;
  display: flex;
  margin: 5%;
  margin-bottom: 0;
  margin-top: 2%;
  text-align: center;
  
`;
