
import React, { createContext, useState, useContext } from 'react';

interface MessageContextType {
  messageContent: string | null;
  messageType: 'success' | 'error' | 'info' | null;
  setMessage: (content: string | null, type?: 'success' | 'error' | 'info') => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageContent, setMessageContent] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | null>(null); // 'success', 'error', 'info'

    const setMessage = (content: string | null, type: 'success' | 'error' | 'info' = 'info') => {
        setMessageContent(content);
        setMessageType(type);
    };

    return (
        <MessageContext.Provider value={{ messageContent, messageType, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};
