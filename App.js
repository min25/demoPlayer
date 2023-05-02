import React, {useState, useRef} from 'react';
import { TouchableOpacity, View, Text, Platform} from 'react-native';
import Video from 'react-native-video';

const App = () => {
  const video1Loaded = useRef(false);
  const video2Loaded = useRef(false);
  const [isMuted1, setIsMuted1] = useState(false);
  const [isMuted2, setIsMuted2] = useState(false);
  const [ispaused, setIsPaused] = useState(true);

  // pause video
  const pauseVideo = () => {
    if(ispaused === true){
      setIsPaused(false)
    }else{
      setIsPaused(true)
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
          paused={ispaused}
          progressUpdateInterval={Platform.OS === "ios" ? 250 : 100}
          muted={isMuted1}
          onLoad={() => {
            video1Loaded.current = true;
            if(video1Loaded.current && video2Loaded.current){
              setIsPaused(false);
            }
          }}
        />
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity style={{marginHorizontal:60, backgroundColor:"gray",height:50, width:100,marginTop:5, justifyContent:'center', alignItems:'center'}} onPress={() => {
           if(isMuted1 === true){
            setIsMuted1(false)
          }else{
            setIsMuted1(true)
          }
        }}>
          <Text style={{ color:'white'}}>{isMuted1 ? 'Mute' :'Unmute'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"gray",height:50, width:100,marginTop:5, justifyContent:'center', alignItems:'center'}} onPress={pauseVideo}>
          <Text style={{ color:'white'}}>{ispaused ? 'start' :'stop'}</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 0.4,
          marginTop:20
        }}
      >
        <Video
          source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
          rate={1.0}
          volume={1.0}
          style={{height: Platform.OS === 'android'? 270:300, width: 400}}
          resizeMode="cover"
          paused={ispaused}
          muted={isMuted2}
          onLoad={() => {
            video2Loaded.current = true;
            if(video1Loaded.current && video2Loaded.current){
              setIsPaused(false);
            }
          }}
        />
      </View>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity style={{marginHorizontal:60, backgroundColor:"gray",height:50, width:100,marginTop:5, justifyContent:'center', alignItems:'center'}} onPress={() => {
           if(isMuted2 === true){
            setIsMuted2(false)
          }else{
            setIsMuted2(true)
          }
        }}>
          <Text style={{ color:'white'}}>{isMuted2 ? 'Mute' :'Unmute'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"gray",height:50, width:100,marginTop:5, justifyContent:'center', alignItems:'center'}} onPress={pauseVideo}>
          <Text style={{ color:'white'}}>{ispaused ? 'start' :'stop'}</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default App;