
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, FlatList, TextInput, ImageBackground, Image, Text, Platform} from 'react-native';
import styled from 'styled-components';
import ViewItem from '../../components/common/ViewItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import Icon2 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {handleGoogleSignIn, onAppleLogin} from './CloudService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// const saveImageAsFile = (imageResource: any) => {
    
//     const imagePath = Image.resolveAssetSource(imageResource).uri;
//     const imageName = imagePath.split('/').pop();
//     const destinationPath = RNFS.DocumentDirectoryPath + '/' + imageName;

//     return RNFS.copyFile(imagePath, destinationPath)
//         .then(() => 'file://' + destinationPath)
//         .catch((error) => {
//             console.error('Error saving image file:', error);
//             return '';
//         });
// };

const bg = require('../../assets/revised.png');
const shape = require('../../assets/DiaryEditPage/shape.png');
const BgContainer = styled(ImageBackground)`
    flex:1;
`;
const TopContainer = styled(View)`
  right:0;
  flex-direction: row;
  padding-right:10%;
  align-items: center;

`;
const Shape = styled(ImageBackground)`
  flex:1;
`;
const HeaderBar = styled(View)`
  width: 100%;
  /* border-width: 1px;
  border-color: white; */
  flex:0.05;
  justify-content: flex-end;
  flex-direction: row;
`;
const SearchArea = styled(View)`
    flex:0.04;
    margin-top:1%;
    margin-bottom: 2%;
`;

const SearchBar = styled(TextInput)`
    border-bottom-width: 2px;
    border-bottom-color: white;
    padding-bottom: 5px;
    margin-left: 7%;
    margin-right: 7%;
    padding-left: 7px;
    opacity: 0.8;
`;
interface Props{
    isSelectable?: Boolean;
}
const Container = styled(View)`
    flex:0.83;
    /* border-color: white;
    border-width: 1px; */
    flex-direction: row;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    /* height: 83%; */
    padding: 5px;
    padding-top: -5px;
    background-color: transparent;
    border-radius: 30px;
`;
const ButtontoMonth = styled(TouchableOpacity)`
    position: absolute;
    width: 25%;
    bottom: 4%;
    right: 6%;
    border-radius: 10px;
    flex-direction: row;
    padding: 3px;
    align-items: center;
    justify-content: center;
`;
const ButtonText = styled(Text)`
    color: #fcf5f5;
    font-size: 15px;
`;
const CheckButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 4%;
  left: ${({isSelectable}: Props)=>(isSelectable? '4%' : '6%')};
  border-radius: 10px;
  padding: 3px;
`;
const Done = styled(Text)`
  color: white;
  font-size: 15px;
`;
const ShareButton = styled(TouchableOpacity)`
  
  
  
  border-radius: 10px;
  padding: 3px;
  
`;
type ItemData = {
    id: string;
    date: string;
    tags: string[];
    diary: string[];
    photo: any;
    isPhoto: boolean;
    isQuote: boolean;
    isDiary: boolean;
};

const DATA: ItemData[] = [
    {
        id: "0", date: "4/21/2023", tags: ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:['file:///Users/jisanpark/Hoohoo/hoohoo_frontend/Diary_app/src/assets/tagRecordingBg.png'],
        isPhoto: false, isQuote: false, isDiary: false
    },
    {
        id: "1", date: "4/15/2023", tags: ["Homework", "TryHard", "ILoveThis", "Longterm"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:['file:///Users/jisanpark/Hoohoo/hoohoo_frontend/Diary_app/src/assets/Background.png','file:///Users/jisanpark/Hoohoo/hoohoo_frontend/Diary_app/src/assets/remove.png'],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "2", date: "4/11/2023", tags: ["Pizza", "Lunch", "GirlFriend", "Expo"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:['file:///Users/jisanpark/Hoohoo/hoohoo_frontend/Diary_app/src/assets/tagRecordingBg.png'],
        isPhoto: true, isQuote: true, isDiary: true
    },
    {
        id: "3", date: "4/10/2023", tags: ["NeverGiveUp", "Dinner", "BeBrave", "Samsung"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:['file:///Users/jisanpark/Hoohoo/hoohoo_frontend/Diary_app/src/assets/ListView_bg.png'],
        isPhoto: false, isQuote: true, isDiary: true
    }
];

// const getBase64Image = async (imagePath: string): any => {
//     try {
//       const base64Image = await RNFS.readFile(imagePath, 'base64');
//       DATA[photo]
      
//       return base64Image;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Could not read image file');
//     }
//   }
// const texts = ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"];
const months: string[] = ["January", "Febrary", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
const ListView = ({ navigation, route }: any) => {
    
    const [isSelectable, setIsSelectable] = useState<boolean>(false);
    const [exportData, setExportData] = useState<ItemData[]>([]);
    const [prevData, setPrevData] = useState<ItemData>();
    const [deleteData, setDeleteData] = useState<boolean>(false);
    const [addData, setAddData] = useState<boolean>(true);
    const dateStringFormat = (dateStr: string) => {
        let day: string = dateStr.split("/")[1];
        let month: string = months[parseInt(dateStr.split("/")[0]) - 1];
        let year: string = dateStr.split("/")[2];
        let dateFormat: string = month + " " + day +" " + year;
        return dateFormat
    }
    // This is rendering callback function. It shows every item view.

      const generateHTML = async (exportData: ItemData[]) => {
        
        const htmlContent = `
        <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica';
              font-size: 12px;
            }
            header, footer {
              height: 50px;
              background-color: #fff;
              color: #000;
              display: flex;
              justify-content: center;
              padding: 0 20px;
            }
            .diary {
              width: 100%;
              border-collapse: collapse;
              flex-direction: column;
            }
            .text {
              width: 100%;
              padding-left:5%;
            }
            .tags {
              width: 100%;
              padding: 5px;
              font-size: 12px;
            }
            .photo {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 10px;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Drop B</h1>
          </header>
              ${exportData
                .map(
                (day) => `
                    <div class="diary">
                      <h2>${dateStringFormat(day.date)}</h2>
                      <div class="tags">
                      <strong>Tag: </strong>
                        ${day.tags.map((tag) => `<q>${tag}</q>`).join(",  ")}
                      </div>
                      <div class="text">
                        ${day.diary.map((entry) => `<p>${entry}</p>`).join(" ")}
                      </div>
                      <div class="photo">
                    ${day.photo
                        .map((file :string) => (file ? `<img src="${file}" style="width: 10%; height:10%" alt="Photo">` : ""))
                        .join("")
                    }
                      </div>
                    </div>
                  `
                )
                  .join("")}
    
            </body>
          </html>
        `;
        try {
            const pdfOptions = {
                html: htmlContent,
                fileName: 'DropBexport',
                directory: 'Documents',
                };
      
        
            const {filePath} = await RNHTMLtoPDF.convert(pdfOptions);
            
            let shareOptions = {
                      url: 'file://'+filePath,
                      type: 'application/pdf',
                      failOnCancel: false,
                    };
              
            await Share.open(shareOptions);
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
        
      };
    useEffect(()=>{
    setList(<FlatList data={filteredData} renderItem={renderItem}
        keyExtractor={(item) => item.id} />);
    },[isSelectable]);
    const toggleItemSelection = (item: ItemData, deleteData: boolean, addData: boolean) => {
        if (item === null) {
          return ;
        }
        if ( exportData.find(selectedItem => selectedItem.id === item.id)) {
            setExportData(prevItems => prevItems.filter(i => i.id !== item.id));
        } else {
            setExportData(prevItems => [...prevItems, item]);
        }
      };
    useEffect(()=> {
        if (prevData !== undefined){
            toggleItemSelection(prevData, deleteData, addData);
            // setExportData(prevData => [...prevData, addedData]);
        }
        
    },[prevData, deleteData, addData])
    
    const renderItem = ({ item, index}: { item: ItemData, index: number}) => {
        
        return (<ViewItem item={item} key={index} isSelectable={isSelectable} 
            prevData={prevData} setPrevData={setPrevData} deleteData={deleteData}
            setDeleteData={setDeleteData} addData={addData}
            setAddData={setAddData}
             />);
    };
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [masterData, setMasterData] = useState<ItemData[]>(DATA);
    const [filteredData, setFilteredData] = useState<ItemData[]>(DATA);
    const [list, setList] = useState<JSX.Element>(<FlatList data={DATA} renderItem={renderItem}
        keyExtractor={(item) => item.id} />);
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        
        const filtered = masterData.filter((item) =>
            item.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase())),
        );
        setFilteredData(filtered);
        setList(<FlatList data={filtered} renderItem={renderItem}
            keyExtractor={(item) => item.id} />);
    };
    const generateCheckBox = (bool : boolean) => {
        setIsSelectable(bool);
        
    }
    const done = ()=> {
      generateCheckBox(false); 
      setExportData([]);

    }
    return (
        
        <BgContainer source={bg} resizeMode='cover' style={{flex:1}} blurRadius={5}>
            <Shape source={shape} resizeMode='cover' style={{flex: 1}}><SafeAreaView style={{flex: 1}}>
            
            
            <HeaderBar>
            { isSelectable && <TopContainer>
            <ShareButton onPress={()=>generateHTML(exportData)}>
                    <Icon name='ios-share' color={ exportData.length!== 0? 'white' :'black'} size={23} />
                </ShareButton>
                {
                  Platform.OS === 'ios' && <ShareButton onPress={()=>{
                    // iCloud
                    onAppleLogin();
                  }}>
                  <CheckIcon name='cloud-upload-outline' color={ exportData.length!== 0? 'white' :'black'} size={23} />
                  </ShareButton>
                }
                
                <ShareButton onPress={()=>{
                  const acc = handleGoogleSignIn(exportData);

                  
                  // google Cloud
                }}>
                <Icon2 name='google-drive' color={ exportData.length!== 0? 'white' :'black'} size={21} />
                </ShareButton>
                </TopContainer>
                }
                </HeaderBar>
            <SearchArea>
                <SearchBar
                    onChangeText={handleSearch}
                    placeholderTextColor="#dfdfdf"
                    style={{color:'white', fontSize:14}}
                    value={searchQuery}
                    placeholder="Search by tags"
                />
            </SearchArea>

            <Container>
                {list}
            </Container>
                <ButtontoMonth onPress={() => {
                    console.log("pressed");
                    navigation.navigate('MonthlyView');
                }}>
                    
                    <ButtonText>Calendar </ButtonText>
                    <Icon name="arrow-forward-ios" color={'#fcf5f5'}/>
                </ButtontoMonth>

            {
                isSelectable? <CheckButton isSelectable={isSelectable} onPress={done} activeOpacity={0.8}>
                <Done>Done</Done>
            </CheckButton> : <CheckButton isSelectable={isSelectable} onPress={()=> {
                generateCheckBox(true)}} activeOpacity={0.8}>
                <CheckIcon name='progress-check' color={'white'} size={25} />
            </CheckButton>
            }
            
            
            </SafeAreaView>
            </Shape>
        </BgContainer>
        
    )
};
export default ListView;


