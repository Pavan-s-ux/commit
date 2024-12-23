import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import {Text} from 'react-native';
import { useMedia } from '~/Providers/Mediaprovider';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function AssetPage(){
    const {id} = useLocalSearchParams<{id:string}>();
    const {getAssetById,assets} = useMedia();
    const asset = getAssetById(id);
   if(!asset){
    return<Text>Asset not found!</Text>
   }
    return(
        <>
        <Stack.Screen options={{title:'Photo',
            headerRight:()=><AntDesign name="cloudupload" size={24} color="black" />,
        }} />
        <Image source={{uri:asset.uri}} style={{width:'100%',height:'100%'}} contentFit='contain'/>
        </>
    )
}