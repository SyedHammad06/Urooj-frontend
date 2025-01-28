'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';

export interface StationaryType {
    stationaryId: number;
    title: string;
    stationaryDescription: string;
    stationaryPrice: string;
    stationaryUrl: string;
    modified: string;
    modifiedBy: string;
}

export default function AddStationary() {
    const titleRef = useRef<HTMLInputElement>(null);
    const stationaryDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const stationaryPriceRef = useRef<HTMLInputElement>(null);
    const stationaryImageRef = useRef<HTMLInputElement>(null);

    const [stationary, setStationary] = useState<StationaryType[]>([]);
    const [selectedStationary, setSelectedStationary] =
        useState<StationaryType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    'https://localhost:7102/api/Stationary/GetAll'
                );
                setStationary(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            titleRef.current &&
            stationaryDescriptionRef.current &&
            stationaryPriceRef.current &&
            stationaryImageRef.current
        ) {
            const body = {
                title: titleRef.current.value,
                stationaryDescription: stationaryDescriptionRef.current.value,
                stationaryPrice: stationaryPriceRef.current.value,
                stationaryUrl: stationaryImageRef.current.value,
            };
            try {
                const res = await axios.post(
                    'https://localhost:7102/api/Stationary/Add',
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (res.status === 200) {
                    const updatedStationary = await axios.get(
                        'https://localhost:7102/api/Stationary/GetAll'
                    );
                    setStationary(updatedStationary.data);
                    alert('Stationery Added Successfully');
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const DeleteStationary = async (stationaryId: number) => {
        try {
            const res = await axios.post(
                `https://localhost:7102/api/Stationary/Remove?stationaryId=${stationaryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${id}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                setStationary(
                    stationary.filter(
                        (item) => item.stationaryId !== stationaryId
                    )
                );
                alert('Stationery Deleted Successfully');
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openEditModal = (item: StationaryType) => {
        setSelectedStationary(item);
        setIsEditModalOpen(true);
    };

    const updateStationary = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedStationary) {
            try {
                const res = await axios.post(
                    `https://localhost:7102/api/Stationary/Update`,
                    selectedStationary,
                    {
                        headers: {
                            Authorization: `Bearer ${id}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (res.status === 200) {
                    const updatedStationary = await axios.get(
                        'https://localhost:7102/api/Stationary/GetAll'
                    );
                    setStationary(updatedStationary.data);
                    setIsEditModalOpen(false);
                    alert('Stationery Updated Successfully');
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
            <h2>Add Stationery</h2>
            <form className={styles.custom_form} onSubmit={onSubmit}>
                <div className={styles.form_field}>
                    <label htmlFor='title'>Stationery Title</label>
                    <input type='text' id='title' ref={titleRef} />
                </div>

                <div className={styles.form_field}>
                    <label htmlFor='stationaryDescription'>Description</label>
                    <textarea
                        id='stationaryDescription'
                        rows={5}
                        ref={stationaryDescriptionRef}
                    />
                </div>

                <div className={styles.form_field}>
                    <label htmlFor='stationaryPrice'>Price</label>
                    <input
                        type='text'
                        id='stationaryPrice'
                        ref={stationaryPriceRef}
                    />
                </div>

                <div className={styles.form_field}>
                    <label htmlFor='stationaryImage'>Image URL</label>
                    <input
                        type='text'
                        id='stationaryImage'
                        ref={stationaryImageRef}
                    />
                </div>
                <button type='submit' className={styles.submit_button}>
                    Add Stationery
                </button>
            </form>

            <h2 style={{ margin: '2rem 0' }}>All Stationery</h2>
            <div className={styles.editBooks_display}>
                {stationary.map((item) => (
                    <div
                        className={styles.editBooks_display_item}
                        key={item.stationaryId}
                    >
                        <h3>{item.title}</h3>
                        <p>
                            <b>Description:</b> {item.stationaryDescription}
                        </p>
                        <p>
                            <b>Price:</b> {item.stationaryPrice}
                        </p>
                        <div className={styles.editBooks_display_btn}>
                            <button onClick={() => openEditModal(item)}>
                                Edit
                            </button>
                            <button
                                onClick={() =>
                                    DeleteStationary(item.stationaryId)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditModalOpen && selectedStationary && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Edit Stationery</h3>
                        <form onSubmit={updateStationary}>
                            <div>
                                <label>Title</label>
                                <input
                                    type='text'
                                    value={selectedStationary.title || ''}
                                    onChange={(e) =>
                                        setSelectedStationary({
                                            ...selectedStationary,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea
                                    value={
                                        selectedStationary.stationaryDescription ||
                                        ''
                                    }
                                    onChange={(e) =>
                                        setSelectedStationary({
                                            ...selectedStationary,
                                            stationaryDescription:
                                                e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label>Price</label>
                                <input
                                    type='text'
                                    value={
                                        selectedStationary.stationaryPrice || ''
                                    }
                                    onChange={(e) =>
                                        setSelectedStationary({
                                            ...selectedStationary,
                                            stationaryPrice: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label>Image URL</label>
                                <input
                                    type='text'
                                    value={
                                        selectedStationary.stationaryUrl || ''
                                    }
                                    onChange={(e) =>
                                        setSelectedStationary({
                                            ...selectedStationary,
                                            stationaryUrl: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label>Modified By</label>
                                <input
                                    type='text'
                                    value={selectedStationary.modifiedBy || ''}
                                    onChange={(e) =>
                                        setSelectedStationary({
                                            ...selectedStationary,
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
