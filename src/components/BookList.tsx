import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import { useMessage } from '../context/MessageContext';
import ConfirmModal from './ConfirmModal';
import StarRating from './StarRating';
import './StarRating.css';
import { useTheme } from '../context/ThemeContext';
import AnimatedBackground from './AnimatedBackground';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBook, faPlus, faChartBar, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Book {
  id: number;
  name: string;
  author: string;
  theme: string;
  rating: number;
  read: boolean;
  favorite: boolean;
}

const BookList = () => {
    const [books, setBooks] = useState<Book[]>(() => {
        const savedBooks = localStorage.getItem('books');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRead, setFilterRead] = useState('all');
    const [filterFavorite, setFilterFavorite] = useState('all');
    const [sortBy, setSortBy] = useState('id');
    const [isLoading, setIsLoading] = useState(true);

    const { messageContent, messageType, setMessage } = useMessage();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme(); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookToDeleteId, setBookToDeleteId] = useState<number | null>(null);

    
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    
    const fetchBooksFromApi = useCallback(async () => {
        setIsLoading(true); // Set loading to true before fetch
        try {
            const response = await api.get('/books');
            let fetchedBooks = response.data;

            
            if (searchTerm) {
                fetchedBooks = fetchedBooks.filter((book: Book) =>
                    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            
            if (filterRead === 'read') {
                fetchedBooks = fetchedBooks.filter((book: Book) => book.read);
            } else if (filterRead === 'unread') {
                fetchedBooks = fetchedBooks.filter((book: Book) => !book.read);
            }

            if (filterFavorite === 'favorite') {
                fetchedBooks = fetchedBooks.filter((book: Book) => book.favorite);
            } else if (filterFavorite === 'not-favorite') {
                fetchedBooks = fetchedBooks.filter((book: Book) => !book.favorite);
            }

            
            fetchedBooks.sort((a: Book, b: Book) => {
                let compare = 0;
                if (sortBy === 'name' || sortBy === 'author' || sortBy === 'theme') {
                    compare = a[sortBy].localeCompare(b[sortBy]);
                } else if (sortBy === 'rating') {
                    compare = a.rating - b.rating;
                } else if (sortBy === 'id') {
                    compare = b.id - a.id;
                }

                return compare;
            });

            setBooks(fetchedBooks);
            localStorage.setItem('books', JSON.stringify(fetchedBooks)); 
            

        } catch (error) {
            console.error('Erreur lors de la synchronisation avec l\'API:', error);
            setMessage('Impossible de se connecter à l\'API. Affichage des données hors ligne.', 'info');
        } finally {
            setIsLoading(false); // Set loading to false after fetch completes (success or error)
        }
    }, [setMessage, searchTerm, filterRead, filterFavorite, sortBy]);

    useEffect(() => {
        if (books.length > 0) {
            fetchBooksFromApi();
        } else {
            fetchBooksFromApi();
        }
    }, [fetchBooksFromApi, location.state]);


    useEffect(() => {
        if (messageContent) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [messageContent, setMessage]);

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message, location.state.type || 'info');
            window.history.replaceState({}, document.title);
        }
    }, [location.state, setMessage]);

    const handleDeleteClick = (id: number) => {
        setBookToDeleteId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/books/${bookToDeleteId}`);
            setBooks(books.filter(book => book.id !== bookToDeleteId));
            setMessage('Livre supprimé avec succès !', 'success');
        } catch (error) {
            console.error('Error deleting book:', error);
            setMessage('Erreur lors de la suppression du livre.', 'error');
        } finally {
            setIsModalOpen(false);
            setBookToDeleteId(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setBookToDeleteId(null);
    };

    const toggleRead = async (book: Book) => {
        try {
            const updatedBook = { ...book, read: !book.read };
            await api.put(`/books/${book.id}`, updatedBook);
            setBooks(books.map(b => (b.id === book.id ? updatedBook : b)));
            setMessage('Statut du livre mis à jour !', 'success');
        } catch (error) {
            console.error('Error updating book:', error);
            setMessage('Erreur lors de la mise à jour du statut du livre.', 'error');
        }
    };

    const toggleFavorite = async (book: Book) => {
        try {
            const updatedBook = { ...book, favorite: !book.favorite };
            await api.put(`/books/${book.id}`, updatedBook);
            setBooks(books.map(b => (b.id === book.id ? updatedBook : b)));
            setMessage(updatedBook.favorite ? 'Livre ajouté aux favoris !' : 'Livre retiré des favoris !', 'success');
        } catch (error) {
            console.error('Error updating favorite status:', error);
            setMessage('Erreur lors de la mise à jour du statut favori.', 'error');
        }
    };

    const handleRating = () => {};

    return (
        <div>
            <h1>Liste de livres</h1>
            <p>Cliquez sur les mots en bleu pour voir les détails des livres.</p>
            {messageContent && <div className={`message ${messageType} global-message`}>{messageContent}</div>}
            <div className="controls-container">
                <input
                    type="text"
                    placeholder="Rechercher par titre ou auteur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select value={filterRead} onChange={(e) => setFilterRead(e.target.value)} className="filter-select">
                    <option value="all">Tous les statuts</option>
                    <option value="read">Lus</option>
                    <option value="unread">Non lus</option>
                </select>
                <select value={filterFavorite} onChange={(e) => setFilterFavorite(e.target.value)} className="filter-select">
                    <option value="all">Tous les favoris</option>
                    <option value="favorite">Favoris</option>
                    <option value="not-favorite">Non favoris</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                    <option value="id">Trier par ID</option>
                    <option value="name">Trier par Titre</option>
                    <option value="author">Trier par Auteur</option>
                    <option value="theme">Trier par Thème</option>
                    <option value="rating">Trier par Note</option>
                </select>

            </div>
            <Link to="/add" className="add-book-link"><FontAwesomeIcon icon={faPlus} /> Ajouter un livre</Link>
            <Link to="/stats" className="add-book-link" style={{ marginLeft: '10px' }}><FontAwesomeIcon icon={faChartBar} /> Voir les statistiques</Link>
            <button onClick={toggleTheme} className="button" style={{ marginLeft: '10px' }}>
                Basculer Thème ({theme === 'light' ? 'Sombre' : 'Clair'})
            </button>
            {isLoading ? (
                <LoadingSpinner />
            ) : books.length === 0 ? (
                <p>Aucun livre disponible. Ajoutez-en un !</p>
            ) : (
                <ul>
                    {books.map((book: Book) => (
                        <li key={book.id} className={book.read ? 'read' : ''}>

                            <div>
                                <Link to={`/books/${book.id}`}>{book.name}</Link> par {book.author}
                                <span className="favorite-icon" onClick={() => toggleFavorite(book)} style={{ cursor: 'pointer' }}>
                                    {book.favorite ? '❤️' : '🤍'}
                                </span>
                                <StarRating rating={book.rating} onRating={handleRating} />
                            </div>
                            <div>
                                <button onClick={() => toggleRead(book)} className="button">
                                    {book.read ? <><FontAwesomeIcon icon={faBookOpen} /> Marquer comme non lu</> : <><FontAwesomeIcon icon={faBook} /> Marquer comme lu</>}
                                </button>
                                <Link to={`/edit/${book.id}`} className="button edit-button"><FontAwesomeIcon icon={faEdit} /> Modifier</Link>
                                <button onClick={() => handleDeleteClick(book.id)} className="delete icon-button">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Êtes-vous sûr de vouloir supprimer ce livre ?"
            />
            <AnimatedBackground />
        </div>
    );
};

export default BookList;