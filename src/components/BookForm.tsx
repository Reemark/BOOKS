import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useMessage } from '../context/MessageContext';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

interface Book {
  id?: number; // id is optional for new books
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

const BookForm = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');
    const [year, setYear] = useState<number | string>('');
    const [read, setRead] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [rating, setRating] = useState(0);
    const [theme, setTheme] = useState('');
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

    const navigate = useNavigate();
    const { id } = useParams();
    const { setMessage } = useMessage();

    useEffect(() => {
        if (id) {
            const fetchBook = async () => {
                try {
                    const response = await api.get(`/books/${id}`);
                    const book: Book = response.data;
                    setName(book.name || '');
                    setAuthor(book.author || '');
                    setEditor(book.editor || '');
                    setYear(book.year || '');
                    setRead(book.read || false);
                    setFavorite(book.favorite || false);
                    setRating(book.rating || 0);
                    setTheme(book.theme || '');
                    setCoverImage(book.coverImage || undefined);
                } catch (error) {
                    console.error('Error fetching book:', error);
                    setMessage('Erreur lors du chargement du livre.', 'error');
                }
            };
            fetchBook();
        }
    }, [id, setMessage]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCoverImage(result.assets[0].uri);
        }
    };

    const handleWebImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const book: Book = { name, author, editor, year: Number(year), read, favorite, rating, theme, coverImage };
        try {
            if (id) {
                await api.put(`/books/${id}`, book);
                setMessage('Livre modifié avec succès !', 'success');
                navigate('/', { state: { refreshList: true, type: 'success' } });
            } else {
                await api.post('/books', book);
                setMessage('Livre ajouté avec succès !', 'success');
                navigate('/', { state: { refreshList: true, type: 'success' } });
            }
        } catch (error) {
            console.error('Error saving book:', error);
            setMessage('Erreur lors de l\'enregistrement du livre.', 'error');
        }
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Retour</button>
            <h1>{id ? 'Modifier le livre' : 'Ajouter un livre'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Auteur</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Éditeur</label>
                    <input type="text" value={editor} onChange={(e) => setEditor(e.target.value)} />
                </div>
                <div>
                    <label>Année</label>
                    <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
                        Lu
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
                        Favori
                    </label>
                </div>
                <div>
                    <label>Note</label>
                    <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} min="0" max="5" />
                </div>
                <div>
                    <label>Thème</label>
                    <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
                </div>
                <div>
                    <label>Image de couverture</label>
                    {Platform.OS === 'web' ? (
                        <input type="file" accept="image/*" onChange={handleWebImageChange} />
                    ) : (
                        <button type="button" onClick={pickImage}>Choisir une image</button>
                    )}
                    {coverImage && <img src={coverImage} alt="Couverture" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />}
                </div>
                <div className="form-buttons">
                    <button type="submit">Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
