import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image, 
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import colors from "../static/colorPallete";
import axios from "axios";
import apiCredentials from "../static/apiKey";
import Icon from '@expo/vector-icons/AntDesign'

export default function Input({ placeholderText }) {
  const [movie, setMovie] = useState(null);
  const [warning, setWarning] = useState("");
  const [title, setTitle] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [isVisible, setIsVisible] = useState('none')
  const [runtime, setRunTime] = useState('');
  const [released, setReleased] = useState('');
  const [type, setType] = useState('');
  const [plot, setPlot]= useState('');
  const [cast, setCast] = useState('');
  const [language, setLanguage] = useState('');
  const [awards, setAwards] = useState('');
  const [isIntroTextVisible, setIsIntroTextVisibible] = useState('flex')
  const [isLoadingVisible, setIsLoadingVisible] = useState('none')
  const [poster, setPoster] = useState('https://w0.peakpx.com/wallpaper/153/552/HD-wallpaper-black-battery-saver-color-colour-plain-solid.jpg')

  const API_URL = `https://omdbapi.com/?t=${movie}&apikey=${apiCredentials.key}`;


  const fetchMovies = async () => {
                axios.get(API_URL)
                .then((movie) => {
                    if (movie.data.Response !== 'False'){
                        setIsVisible('flex');
                        setWarning("");
                        setPoster(movie.data.Poster);
                        setTitle(movie.data.Title);
                        setRunTime(movie.data.Runtime);
                        setImdbRating(movie.data.imdbRating);
                        setReleased(movie.data.Released);
                        setType(movie.data.Type);
                        setPlot(movie.data.Plot);
                        setCast(movie.data.Actors);
                        setLanguage(movie.data.Language);
                        setAwards(movie.data.Awards);
                        setIsLoadingVisible('none');
                    }else{
                        setWarning(`${movie.data.Error} Might be a spelling error.`)
                        setIsLoadingVisible('none')
                    }
                })
                .catch((err) => {
                  setWarning(err);
                  setIsLoadingVisible('none')
                });
  }

  return (
    <>
    
      <View style={styles.inputContainer}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="name"
          inlineImageLeft="search_icon"
          keyboardAppearance="dark"
          selectionColor={colors.primaryYellow}
          value={movie}
          onChangeText={(movieName) => setMovie(movieName)}
          cursorColor={colors.primaryYellow}
          placeholder={placeholderText}
          placeholderTextColor={colors.secondaryText}
          style={styles.inputText}
        />
        <TouchableOpacity
          onPress={() => {
              if (movie !== null) {
                  fetchMovies();
                  setIsLoadingVisible('flex');
                  setIsIntroTextVisibible('none')
                } else {
              setWarning("Movie name is required");
              setMovie(null);
            }
          }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>{warning}</Text>
      <View style={{height:'100%', flex:1, justifyContent:'center', alignItems:'center', display:isLoadingVisible}}>
        <ActivityIndicator color={colors.primaryYellow} visible={true} textContent={'Loading...'} />
      </View>
      <View style={{marginTop:200, paddingHorizontal:100, display:isIntroTextVisible}}>
        <Text style={{color:colors.secondaryText, fontSize:20, textAlign:'center'}}>Search for your favorite movies and TV shows.</Text>
    </View>
      <View style={[styles.movieInfoContainer, {display:isVisible}]}>
        <Image style={styles.poster} source={{uri : poster}} />
        <Text style={[styles.basicText, styles.title]}>{title}</Text>
        <View style={styles.ratingContainer}>
            <Icon size={23} color={colors.primaryYellow} name="star" />
            <Text style={[styles.basicText, {fontSize:22, paddingHorizontal:5, fontWeight:'700'}]}>{imdbRating}</Text>
        </View>
        <View style={styles.infoTab_1}>
          <Text style={[styles.basicText, styles.tabInfoTextBoxes]}>{runtime}</Text>
          <Text style={[styles.basicText, styles.tabInfoTextBoxes]}>{released}</Text>
          <Text style={[styles.basicText, styles.tabInfoTextBoxes]}>{type}</Text>
        </View>
        <View style={styles.infoTab_2}>
            <Text style={{fontSize:20, fontWeight:'700', paddingHorizontal:20, color:colors.primaryYellow}}>Plot:</Text>
          <Text style={[styles.basicText, styles.tabText]}>{plot}</Text>
        </View>
        <View style={styles.infoTab_3}>
            <Text style={{fontSize:20, fontWeight:'700', paddingHorizontal:20, color:colors.primaryYellow}}>Cast:</Text>
          <Text style={[styles.basicText, styles.tabText]}>{cast}</Text>
        </View>
        <View style={styles.infoTab_4}>
            <Text style={{fontSize:20, fontWeight:'700', paddingHorizontal:20, color:colors.primaryYellow}}>Awards:</Text>
          <Text style={[styles.basicText, styles.tabText]}>{awards}</Text>
        </View>
        <View style={[styles.infoTab_5, {marginBottom:50}]}>
            <Text style={{fontSize:20, fontWeight:'700', paddingHorizontal:20, color:colors.primaryYellow}}>Language:   <Text style={{fontSize : 17, fontWeight:'600', color:colors.primaryText}}>{language}</Text></Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    marginTop: 50,
  },
  inputText: {
    backgroundColor: colors.greyContainer,
    borderRadius: 5,
    width: Dimensions.get("screen").width * 0.60,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.primaryText,
    fontWeight: "600",
    borderColor:'transparent'
  },
  btnText: {
    color: colors.pitchBlack,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    justifyContent:'center'
  },
  btn: {
    backgroundColor: colors.primaryYellow,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  warningText: {
    color: colors.warningText,
    textAlign: "center",
    fontWeight: "800",
    margin: 10,
    fontSize: 15,
  },
  poster:{
    height:250,
    justifyContent:'center',
    resizeMode:'contain',
    
  }, 
  movieInfoContainer:{
    marginTop:30
  },
  title:{
    color:colors.primaryText,
    fontWeight:'900',
    fontSize:25,
    textAlign:'center',
    marginVertical:20,
    paddingHorizontal:20
  }, basicText:{color:colors.primaryText,},
  ratingContainer:{
    display:'flex',
    flexDirection:'row', 
    justifyContent:'center'
  },
  infoTab_1:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginVertical:25,
    marginHorizontal:20
  },
  tabInfoTextBoxes:{
    paddingHorizontal:8,
    paddingVertical:5,
    borderColor:colors.primaryYellow,
    borderRadius:5,
    borderWidth:1,
    fontWeight:'700',
    fontSize:15
  }, 
  tabText:{
    fontSize:16, 
    fontWeight:'600', 
    padding:20,
  }
});
