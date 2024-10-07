import LoadingPage from "@/pages/loading/Loading-page"
import { Href, Stack, router } from "expo-router"
import { useEffect } from "react"


interface ILoadingProps {
    redirectUrl: Href<string>
}

const LoadingScreen:React.FC<ILoadingProps> =(props)=>{


    useEffect(()=>{
        const timer = setTimeout(()=>{

           
             router.navigate('/')
        }, 3000)
        return ()=> clearTimeout(timer)
    },[])


    return   <>
    <Stack.Screen options={{ title: "Loading screen", headerShown: false }} />

    <LoadingPage />

  </>
} 



export default LoadingScreen