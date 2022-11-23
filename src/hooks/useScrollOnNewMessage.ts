/* eslint-disable no-param-reassign */
import { useLayoutEffect, useRef, RefObject } from "react"
import { useMessages } from "../providers"

export const useScrollToBotonOnNewMessage = (elementRef: RefObject<HTMLElement>) => {
  const messages = useMessages()
  const previousMessagesRef = useRef<number>(0)
  useLayoutEffect(() => {
    if(messages.length > previousMessagesRef.current && elementRef.current) {
      previousMessagesRef.current = messages.length
      elementRef.current.scrollTop = elementRef.current.scrollHeight
    }
  }, [messages])
}

