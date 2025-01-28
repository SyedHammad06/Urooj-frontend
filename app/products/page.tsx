'use client';

import { useEffect, useState } from 'react';
import Navigation from '../ui/nav/nav';
import styles from './page.module.css';
import { BookType } from '../dashboard/books/page';
import { StationaryType } from '../dashboard/stationary/page';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Footer from '../ui/footer/footer';

export default function Products() {
    const router = useSearchParams();
    const id = router.get('id');
    const [books, setBooks] = useState<BookType[]>([]);
    const [stationary, setStationary] = useState<StationaryType[]>([]);
    const [selected, setSelected] = useState('books');
    const [openModal, setOpenModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
    const [selectedStationary, setSelectedStationary] =
        useState<StationaryType | null>(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7102/api/Urooj/Books'
                );
                setBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getStationary = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7102/api/Stationary/GetAll'
                );
                setStationary(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getBooks();
        getStationary();
    }, []);

    const handleViewBook = (bookId: number) => {
        const book = books.find((b) => b.bookId === bookId);
        if (book) {
            setSelectedBook(book);
            setSelectedStationary(null); // Clear any stationery modal
            setOpenModal(true);
        }
    };

    const handleViewStationary = (stationaryId: number) => {
        const item = stationary.find((s) => s.stationaryId === stationaryId);
        if (item) {
            setSelectedStationary(item);
            setSelectedBook(null); // Clear any book modal
            setOpenModal(true);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setSelectedBook(null);
        setSelectedStationary(null);
    };

    return (
        <>
            <Navigation id={id} />
            <div className={styles.products}>
                <div className={styles.products_menu}>
                    <h3 onClick={() => setSelected('books')}>Books</h3>
                    <hr />
                    <h3 onClick={() => setSelected('stationary')}>
                        Stationery
                    </h3>
                </div>
                <div className={styles.products_books_display}>
                    {selected === 'books'
                        ? books.map((book) => (
                              <div
                                  key={book.bookId}
                                  className={styles.products_books_display_card}
                              >
                                  <Image
                                      src={book.bookUrl}
                                      alt={book.bookName}
                                      width={200}
                                      height={200}
                                  />
                                  <h3>{book.bookName}</h3>
                                  <button
                                      onClick={() =>
                                          handleViewBook(book.bookId)
                                      }
                                  >
                                      View
                                  </button>
                              </div>
                          ))
                        : stationary.map((item) => (
                              <div
                                  key={item.stationaryId}
                                  className={styles.products_books_display_card}
                              >
                                  <Image
                                      src={item.stationaryUrl}
                                      alt={item.title}
                                      width={200}
                                      height={200}
                                  />
                                  <h3>{item.title}</h3>
                                  <button
                                      onClick={() =>
                                          handleViewStationary(
                                              item.stationaryId
                                          )
                                      }
                                  >
                                      View
                                  </button>
                              </div>
                          ))}
                </div>
            </div>

            {openModal && selectedBook && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <button onClick={closeModal} className={styles.close}>
                            &times;
                        </button>
                        <h2>{selectedBook.bookName}</h2>
                        <Image
                            src={selectedBook.bookUrl}
                            alt={selectedBook.bookName}
                            width={300}
                            height={300}
                        />
                        <div>
                            <div>
                                <b>Book Description: </b>
                                <p>{selectedBook.bookDescription}</p>
                            </div>
                            <hr />
                            <div>
                                <b>Book Content: </b>
                                <p>{selectedBook.bookContent}</p>
                            </div>
                            <hr />
                            <div>
                                <b>Subject: </b>
                                <p>{selectedBook.subject}</p>
                            </div>
                            <hr />
                            <div>
                                <b>Class: </b>
                                <p>{selectedBook.class}</p>
                            </div>
                            <hr />
                            <div>
                                <b>Is it a part of Hauna Program?: </b>
                                <p>
                                    {selectedBook.hProgram === '1'
                                        ? 'Yes'
                                        : 'No'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {openModal && selectedStationary && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <button onClick={closeModal} className={styles.close}>
                            &times;
                        </button>
                        <h2>{selectedStationary.title}</h2>
                        <Image
                            src={selectedStationary.stationaryUrl}
                            alt={selectedStationary.title}
                            width={300}
                            height={300}
                        />
                        <div>
                            <div>
                                <b>Description: </b>
                                <p>
                                    {selectedStationary.stationaryDescription}
                                </p>
                            </div>
                            <hr />
                            <div>
                                <b>Price: </b>
                                <p>{selectedStationary.stationaryPrice}</p>
                            </div>
                            <hr />
                            <div>
                                <b>Modified: </b>
                                <p>{selectedStationary.modified}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
