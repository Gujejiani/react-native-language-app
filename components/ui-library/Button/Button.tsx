import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import Fontisto from '@expo/vector-icons/Fontisto';

const Button: React.FC<{   style?: {}, disabled?: boolean, title: string; onPress: () => void }> = ({
  title,
  onPress,
  disabled,
  style
}) => {
  const [bounce, setBounce] = useState(true);

  const handlePress = (e: any) => {

    e.stopPropagation();
    if(disabled) return;
    setBounce(false);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // todo fix this
    setTimeout(() => {
      onPress();
    }, 400);
  };

  const handlePressOut = () => {
    setBounce(true);
  };

  return (
    <View  >
      <TouchableOpacity
        onPressIn={handlePress}
        onPressOut={handlePressOut}
        activeOpacity={1}
        disabled={disabled}
      
        
        style={[styles.button, !bounce ? styles.bounceEffect : {}, disabled ? styles.disabledButton : {}, style]}
       
      >
 
        <ThemedText style={[styles.buttonText, disabled ? styles.disabledColor : {} ]}> {title} 

        <View  >
         {disabled? <Fontisto  style={styles.iconColor} name="locked" size={20} color="black" />: '' }
         </View>
        </ThemedText>
      
      </TouchableOpacity>
      <View style={[styles.shadowEffect, disabled ? styles.hideShadow : {}]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  bounceEffect: {
    top: 8,
  },
  
  shadowEffect: {
    backgroundColor: "#F0F0F0",
    width: "100%",
    height: 20,
    borderRadius: 8,

    bottom: 14,
  },
  hideShadow: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    zIndex: 4,
  },
  disabledButton: {
    opacity: 0.8,
    
  
  },
  buttonText: {
    color: "#34D399", // Green color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  iconColor: {
    color: "#D1D5DB",
    marginLeft: 10,
   
  },

  disabledColor: {
    color: "#D1D5DB",
  }
});

export default Button;
