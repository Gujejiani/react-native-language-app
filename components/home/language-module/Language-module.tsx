import { ThemedText, } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IModule } from "@/models/";
import React from "react";
import { StyleSheet } from "react-native";
import ModuleTitle from "./components/module-title/ModuleTitle";
import LessonButton from "@/components/ui-library/Lesson-Button/LessonButton";


interface LanguageModuleProps { 
    module: IModule
}


export const LanguageModule: React.FC<LanguageModuleProps> = ({module}) => {
    
        

    const moduleLessons = module.lessons.map(lesson => {
        return (
            <ThemedView key={lesson.id}>

                <ThemedText  >{lesson.name.en}</ThemedText>
                <ThemedText>{lesson.description.en}</ThemedText>
            </ThemedView>
        )
    })

    return (
        <ThemedView style={styles.moduleContainer}  >

            <ModuleTitle title={module.name.en}  />

            <LessonButton  iconName="star" progress={0.75} label="Start"  />

           {moduleLessons}
        </ThemedView>
    )

}

const styles =  StyleSheet.create({
    moduleContainer: {
     
        display: 'flex',
        width: '100%',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
    moduleTitle: {
        textAlign: 'center',
        paddingHorizontal: 10,
        color: 'gray',
        fontWeight: 'bold',


    },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray', 
        marginHorizontal: 10, 
      },
      

})