import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import BounceButton from '../../../../ui-library/bounce-button/BounceButton';

interface SectionHeaderProps {

    title: string;
    onPress?: () => void;
    description: string;
}


const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, onPress }) => {

   
    const handlePress = ()=>{
        console.log('section header pressed');
    }

    

    return <ThemedView style={styles.container} >

        <ThemedView style={styles.content} >

      
        <ThemedView style={styles.infoWrapper} >


            <BounceButton 
                style={styles.info}
                pressEffectStyle={styles.infoPressEffect}
                onPress={handlePress}
             
            >
            <ThemedText style={styles.title} > {title} </ThemedText>

            <ThemedText style={styles.description} > {description} </ThemedText>
            </BounceButton>
      
                  
        </ThemedView>
     
  

        <BounceButton 
            onPress={handlePress}
        style={styles.guide} pressEffectStyle={styles.guidePressEffect} > 
            <ThemedText><FontAwesome name="book" size={24} color="white" /></ThemedText>
         </BounceButton>
     
        </ThemedView>
         

     
    </ThemedView>
};


export default SectionHeader;


const styles = StyleSheet.create({
  
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 40,
        position: "relative",
        top: 36,
        zIndex: 100,
        width: "100%",
      
        
      
    },
    infoPressEffect: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    guidePressEffect: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    infoWrapper: {
       flex: 1,
      
     
    },
    info: {
     
        backgroundColor: 'pink',
  
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        zIndex: 10,
      
    },
    guide: {
        backgroundColor: 'pink',
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderLeftColor: 'gray',
        borderLeftWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
       
       
    },
    content: {
        flexDirection: "row",
      
        position: "absolute",
        width: "100%",
       
   
        left: 16,
        


    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#fff',
        opacity: 0.6
    },
    description: {
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        textTransform: 'capitalize'
    },

});