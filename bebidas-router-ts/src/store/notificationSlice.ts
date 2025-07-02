import type { StateCreator } from "zustand"

type Notification={
    text:string
    error:boolean
    show:boolean
}

export type NotificationSliceType={
    notification:Notification
    showNotification:(payload:Pick<Notification,"text"|"error">)=> void
    hideNotification:()=> void
}

export const createNotificationSlice:StateCreator<NotificationSliceType>=(set,get)=>({
    notification:{
        text:"",
        show:false,
        error:false
    },
    showNotification:(payload)=>{
        set({
            notification:{
                text:payload.text,
                error:payload.error,
                show:true
            }
        })
        setTimeout(()=>{
            get().hideNotification()
        },3000)
    },
    hideNotification:()=>{
        set({
            notification:{
                text:"",
                show:false,
                error:false
            }
        })
    }
})