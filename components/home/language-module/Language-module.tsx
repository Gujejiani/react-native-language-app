import { IModule } from "@/models/";
import React from "react";


interface LanguageModuleProps { 
    module: IModule
}


export const LanguageModule: React.FC<LanguageModuleProps> = ({module}) => {
        

    const moduleLessons = module.lessons.map(lesson => {
        return (
            <div key={lesson.id}>
                <h3>{lesson.name.en}</h3>
                <p>{lesson.description.en}</p>
            </div>
        )
    })

    return (
        <div>
            LanguageModule
        </div>
    )

}