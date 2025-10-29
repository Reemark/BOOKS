import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import StarRating from './StarRating';
import './StarRating.css';
import { useMessage } from '../context/MessageContext';

interface Book {
  id: number;
  name: string;
  author: string;
  editor: string;
  year: number;
  read: boolean;
  favorite: boolean;
  rating: number;
  theme: string;
  coverImage?: string;
}

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

const BookDetails = () => {
    const [book, setBook] = useState<Book | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [openLibraryEditions, setOpenLibraryEditions] = useState<number | null>(null); // New state for OpenLibrary editions
    const { id } = useParams();

    const navigate = useNavigate();
    const { setMessage } = useMessage();

    const fetchBookAndNotes = async () => {
        try {
            const bookResponse = await api.get(`/books/${id}`);
            setBook(bookResponse.data);

            const notesResponse = await api.get(`/books/${id}/notes`);
            setNotes(notesResponse.data);
        } catch (error) {
            console.error('Error fetching book or notes:', error);
            setMessage('Erreur lors du chargement du livre ou des notes.', 'error');
        }
    };

    useEffect(() => {
        fetchBookAndNotes();
    }, [id, setMessage]);

    // New useEffect for OpenLibrary API integration
    useEffect(() => {
        if (book && book.name) {
            const fetchOpenLibraryData = async () => {
                try {
                    const title = encodeURIComponent(book.name);
                    const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
                    const data = await response.json();
                    if (data && data.numFound !== undefined) {
                        setOpenLibraryEditions(data.numFound);
                    }
                } catch (error) {
                    console.error('Error fetching from OpenLibrary API:', error);
                    // Optionally, set a message for the user
                }
            };
            fetchOpenLibraryData();
        }
    }, [book]); // Trigger when book object changes

    const handleSubmitNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteContent.trim()) return;

        try {
            await api.post(`/books/${id}/notes`, { content: newNoteContent });
            setNewNoteContent('');
            fetchBookAndNotes(); // Refresh notes
            setMessage('Note ajoutée avec succès !', 'success');
        } catch (error) {
            console.error('Error adding note:', error);
            setMessage('Erreur lors de l\'ajout de la note.', 'error');
        }
    };

    const toggleFavorite = async () => {
        if (!book) return;
        try {
            const updatedBook = { ...book, favorite: !book.favorite };
            await api.put(`/books/${book.id}`, updatedBook);
            setBook(updatedBook); // Update local state immediately
            setMessage(updatedBook.favorite ? 'Livre ajouté aux favoris !' : 'Livre retiré des favoris !', 'success');
        } catch (error) {
            console.error('Error updating favorite status:', error);
            setMessage('Erreur lors de la mise à jour du statut favori.', 'error');
        }
    };

    const handleRating = async (rating: number) => {
        if (!book) return;
        try {
            const updatedBook = { ...book, rating };
            await api.put(`/books/${book.id}`, updatedBook);
            setBook(updatedBook);
            setMessage('Note mise à jour avec succès !', 'success');
        } catch (error) {
            console.error('Error updating rating:', error);
            setMessage('Erreur lors de la mise à jour de la note.', 'error');
        }
    };

    if (!book) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="book-details">
            <button onClick={() => navigate(-1)}>← Retour</button>
            <h1>{book.name}
                <span className="favorite-icon" onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
                    {book.favorite ? '❤️' : '🤍'}
                </span>
            </h1>
            {book.coverImage && <img src={book.coverImage} alt="Couverture du livre" style={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }} />}
            <p><strong>Auteur:</strong> {book.author}</p>
            <p><strong>Éditeur:</strong> {book.editor}</p>
            <p><strong>Année:</strong> {book.year}</p>
            <p><strong>Statut:</strong> {book.read ? 'Lu' : 'Non lu'}</p>
            <p><strong>Favori:</strong> {book.favorite ? 'Oui' : 'Non'}</p>
            <p><strong>Note:</strong> <StarRating rating={book.rating} onRating={handleRating} /></p>

            <p><strong>Thème:</strong> {book.theme}</p>

            {openLibraryEditions !== null && (
                <p>
                    <span style={{ color: '#007bff', fontSize: '1.1em', fontWeight: 'bold' }}> {/* Added styling */}
                        Nombre d'éditions référencées (OpenLibrary): {openLibraryEditions}
                    </span>
                </p>
            )}

            <div className="notes-section">
                <h2>Notes</h2>
                {notes.length === 0 ? (
                    <p>Aucune note pour ce livre.</p>
                ) : (
                    <ul>
                        {notes.map((note: Note) => (
                            <li key={note.id} className="note-item">
                                <p>{note.content}</p>
                                <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                            </li>
                        ))}
                    </ul>
                )}

                <form onSubmit={handleSubmitNote} className="add-note-form">
                    <textarea
                        placeholder="Ajouter une nouvelle note..."
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                    ></textarea>
                    <button type="submit">Ajouter Note</button>
                </form>
            </div>
        </div>
    );
};

export default BookDetails;