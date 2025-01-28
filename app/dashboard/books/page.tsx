'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export interface BookType {
    bookId: number;
    bookName: string;
    bookDescription: string;
    bookContent: string;
    subject: string;
    class: string;
    hProgram: string;
    bookUrl: string;
    modified: string;
    modifiedBy: string;
}

export default function AddBooks() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const bookNameRef = useRef<HTMLInputElement>(null);
    const bookDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const bookContentRef = useRef<HTMLTextAreaElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const classRef = useRef<HTMLInputElement>(null);
    const hProgramRef = useRef<HTMLInputElement>(null);
    const bookImageRef = useRef<HTMLInputElement>(null);

    const [books, setBooks] = useState<BookType[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [username, setUserName] = useState('');

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await axios.get(
                        'https://localhost:7102/api/Urooj/Verify',
                        {
                            headers: {
                                Authorization: `Bearer ${id}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.data.userName) {
                        setUserName(response.data.userName);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        } else {
            router.replace('/');
        }
        (async () => {
            try {
                const res = await axios.get(
                    'https://localhost:7102/api/Urooj/Books'
                );
                setBooks(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id, router]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            bookNameRef.current &&
            bookDescriptionRef.current &&
            bookContentRef.current &&
            subjectRef.current &&
            classRef.current &&
            hProgramRef.current &&
            bookImageRef.current
        ) {
            const body = {
                bookName: bookNameRef.current.value,
                bookDescription: bookDescriptionRef.current.value,
                bookContent: bookContentRef.current.value,
                subject: subjectRef.current.value,
                class: classRef.current.value,
                hProgram: hProgramRef.current.value === 'Yes' ? '1' : '0',
                bookUrl: bookImageRef.current.value,
                modifiedBy: username,
            };
            try {
                const res = await axios.post(
                    'https://localhost:7102/api/Urooj/Books/AddBook',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (res.status === 200) {
                    const updatedBooks = await axios.get(
                        'https://localhost:7102/api/Urooj/Books'
                    );
                    setBooks(updatedBooks.data);
                    alert('Book Added Successfully');
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const DeleteBook = async (bookId: number) => {
        try {
            const res = await axios.post(
                `https://localhost:7102/api/Urooj/Books/Remove?bookId=${bookId}&ModifiedBy=${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${id}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                setBooks(books.filter((book) => book.bookId !== bookId));
                alert('Book Deleted Successfully');
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openEditModal = (book: BookType) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    const updateBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedBook) {
            try {
                const res = await axios.post(
                    `https://localhost:7102/api/Urooj/Books/EditBook`,
                    selectedBook,
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (res.status === 200) {
                    const updatedBooks = await axios.get(
                        'https://localhost:7102/api/Urooj/Books'
                    );
                    setBooks(updatedBooks.data);
                    setIsEditModalOpen(false);
                    alert('Book Updated Successfully');
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={styles.editBooks}>
            <h2>Add Books</h2>
            <form className={styles.custom_form} onSubmit={onSubmit}>
                <div className={styles.form_field}>
                    <label htmlFor='bookName'>Book Name</label>
                    <input type='text' id='bookName' ref={bookNameRef} />
                </div>

                <div className={styles.form_field}>
                    <label htmlFor='subject'>Subject</label>
                    <input type='text' id='subject' ref={subjectRef} />
                </div>
                <div className={styles.form_field}>
                    <label htmlFor='class'>Class</label>
                    <input type='text' id='class' ref={classRef} />
                </div>
                <div className={styles.form_field}>
                    <label htmlFor='hProgram'>
                        Is it a part of Hauna? (Yes or No)
                    </label>
                    <input type='text' id='hProgram' ref={hProgramRef} />
                </div>
                <div className={styles.form_field}>
                    <label htmlFor='bookDescription'>Book Description</label>
                    <textarea
                        id='bookDescription'
                        rows={5}
                        ref={bookDescriptionRef}
                    />
                </div>
                <div className={styles.form_field}>
                    <label htmlFor='bookContent'>Book Content</label>
                    <textarea id='bookContent' rows={5} ref={bookContentRef} />
                </div>
                <div className={styles.form_field}>
                    <label htmlFor='bookImage'>Book Image URL</label>
                    <input type='text' id='bookImage' ref={bookImageRef} />
                </div>
                <button type='submit' className={styles.submit_button}>
                    Add Book
                </button>
            </form>
            <h2 style={{ margin: '2rem 0' }}>All Books</h2>
            <div className={styles.editBooks_display}>
                {books.map((book) => (
                    <div
                        className={styles.editBooks_display_item}
                        key={book.bookId}
                    >
                        <h3>{book.bookName}</h3>
                        <p>
                            <b>Subject:</b> {book.subject}
                        </p>
                        <p>
                            <b>Class:</b> {book.class}
                        </p>
                        <p>
                            <b>Modified By:</b> {book.modifiedBy}
                        </p>
                        <div className={styles.editBooks_display_btn}>
                            <button onClick={() => openEditModal(book)}>
                                Edit
                            </button>
                            <button onClick={() => DeleteBook(book.bookId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isEditModalOpen && selectedBook && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Edit Book</h3>
                        <form onSubmit={updateBook}>
                            <div>
                                <label>Book Name</label>
                                <input
                                    type='text'
                                    value={selectedBook.bookName || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            bookName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label>Book Description</label>
                                <textarea
                                    value={selectedBook.bookDescription || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            bookDescription: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>Book Content</label>
                                <textarea
                                    value={selectedBook.bookContent || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            bookContent: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>Subject</label>
                                <input
                                    type='text'
                                    value={selectedBook.subject || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            subject: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>Class</label>
                                <input
                                    type='text'
                                    value={selectedBook.class || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            class: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>
                                    Is it a part of Hauna? (Yes or No)
                                </label>
                                <input
                                    type='text'
                                    value={
                                        selectedBook.hProgram === '1'
                                            ? 'Yes'
                                            : 'No'
                                    }
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            hProgram:
                                                e.target.value.toLowerCase() ===
                                                'yes'
                                                    ? '1'
                                                    : '0',
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>Book Image URL</label>
                                <input
                                    type='text'
                                    value={selectedBook.bookUrl || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            bookUrl: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label>Modified By</label>
                                <input
                                    type='text'
                                    value={selectedBook.modifiedBy || ''}
                                    onChange={(e) =>
                                        setSelectedBook({
                                            ...selectedBook,
                                            modifiedBy: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button type='submit'>Update</button>
                            <button onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
