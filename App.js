import React, {useState} from 'react';
import { TouchableOpacity, View, Text, Platform} from 'react-native';
import Video from 'react-native-video';

const App = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // mute & unmute video
  const muteVideo = () => {
    if(isMuted === true){
      setIsMuted(false)
    }else{
      setIsMuted(true)
    }
  };

  //try m3u8 foramt as a video source
  const array = [
    {
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      video:'http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8',
    }
  ];

  console.log("current time of video",currentTime);
  //For synchronising we have use current time of the first video player and seek with second video player
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 0.5,
        }}
      >
        <Video
          source={{uri: 'https://www.w3schools.com/html/movie.mp4'}}
          rate={1.0}
          volume={1.0}
          style={{height: 300, width: 400}}
          resizeMode="cover"
          paused={false}
          progressUpdateInterval={Platform.OS === "ios" ? 250 : 100}
          muted={isMuted}
          onLoad={(data) => {
            console.log("data in onload", data);
          }}
          onProgress={(data) => {
            setCurrentTime(data.currentTime)}
          }
          fullscreen={true}
        />
        <View style={{flexDirection:'column', alignItems:'center'}}>
        <TouchableOpacity style={{backgroundColor:"gray",height:50, width:100,marginTop:5, justifyContent:'center', alignItems:'center'}} onPress={muteVideo}>
          <Text>{isMuted ? 'Mute' :'unMute'}</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 0.5,
        }}
      >
        <Video
          source={{uri: 'https://www.w3schools.com/html/movie.mp4'}}
          rate={1.0}
          volume={1.0}
          style={{height: 400, width: 400}}
          resizeMode="cover"
          paused={false}
          seek={currentTime}
        />
      </View>
    </View>
  );
};

export default App;