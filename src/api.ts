import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

// Request interceptor to mock /stats endpoint
instance.interceptors.request.use(config => {
    if (config.url === '/stats') {
        const savedBooks = localStorage.getItem('books');
        const books = savedBooks ? JSON.parse(savedBooks) : [];

        const totalBooks = books.length;
        const readBooks = books.filter((book: any) => book.read).length;
        const unreadBooks = totalBooks - readBooks;
        const totalRating = books.reduce((sum: number, book: any) => sum + book.rating, 0);
        const averageRating = totalBooks > 0 ? (totalRating / totalBooks) : 0;

        // Mock response for /stats
        config.adapter = async (config) => {
            return {
                data: {
                    total: totalBooks,
                    read: readBooks,
                    unread: unreadBooks,
                    averageRating: parseFloat(averageRating.toFixed(2)),
                },
                status: 200,
                statusText: 'OK',
                headers: config.headers,
                config: config,
                request: {} as XMLHttpRequest, // Mock request object
            };
        };
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;