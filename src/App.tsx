import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import StatsDashboard from './components/StatsDashboard';
import './App.css';

import { MessageProvider, useMessage } from './context/MessageContext';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

function AppContent() {
    const { messageContent, messageType, setMessage } = useMessage();

    useEffect(() => {
        if (messageContent) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000); // Clear message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [messageContent, setMessage]);

    return (
        <Router>
            <div className="App">
                {messageContent && <div className={`message ${messageType} global-message`}>{messageContent}</div>}
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/add" element={<BookForm />} />
                    <Route path="/edit/:id" element={<BookForm />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/stats" element={<StatsDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <MessageProvider>
            <ThemeProvider> {/* Wrap AppContent with ThemeProvider */}
                <AppContent />
            </ThemeProvider>
        </MessageProvider>
    );
}

export default App;