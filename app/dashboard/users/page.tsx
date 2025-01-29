'use client';

import { FormEvent, Suspense, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';

export interface AddUsersType {
    userName: string;
    fName: string;
    mName: string;
    lName: string;
    userAddress: string;
    phote: string;
    adhaar: string;
    city: string;
    state: string;
    country: string;
    personalEmail: string;
    isAdmin: number;
    fullName: string | null;
}

export default function AddUsers() {
    const fNameRef = useRef<HTMLInputElement>(null);
    const mNameRef = useRef<HTMLInputElement>(null);
    const lNameRef = useRef<HTMLInputElement>(null);
    const userAddressRef = useRef<HTMLInputElement>(null);
    const adhaarRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const personalEmailRef = useRef<HTMLInputElement>(null);
    const isAdminRef = useRef<HTMLSelectElement>(null);
    const [users, setUsers] = useState<AddUsersType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    'http://147.93.102.224:5000/api/Urooj/GetUsers'
                );
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [setUsers]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (fNameRef.current && lNameRef.current && personalEmailRef.current) {
            const body = {
                fName: fNameRef.current.value,
                lName: lNameRef.current.value,
                mName: mNameRef.current ? mNameRef.current.value : '',
                userAddress: userAddressRef.current
                    ? userAddressRef.current.value
                    : '',
                phote: '',
                adhaar: adhaarRef.current ? adhaarRef.current.value : '',
                city: cityRef.current ? cityRef.current.value : '',
                state: stateRef.current ? stateRef.current.value : '',
                country: countryRef.current ? countryRef.current.value : '',
                personalEmail: personalEmailRef.current.value,
            };
            console.log(body);
            try {
                const res = await axios.put(
                    'http://147.93.102.224:5000/api/Urooj/addAdmin',
                    body
                );
                if (res.status === 200) {
                    alert('User Added Successfully');
                    const res = await axios.get(
                        'http://147.93.102.224:5000/api/Urooj/GetUsers'
                    );
                    setUsers(res.data);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const DeleteUsers = async (userName: string) => {
        const res = await axios.post(
            `http://147.93.102.224:5000/api/Urooj/RemoveUser/${userName}`
        );
        if (res.status === 200) {
            const newStationary = users.filter(
                (items) => items.userName !== userName
            );
            setUsers(newStationary);
            alert('User Deleted Successfully');
        } else {
            alert('Something went wrong');
        }
    };

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className={styles.editBooks}>
                <h2>Add Users</h2>
                <form className={styles.custom_form} onSubmit={onSubmit}>
                    <div className={styles.form_field}>
                        <label htmlFor='fname'>First Name</label>
                        <input type='text' id='fname' ref={fNameRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='mName'>Middle Name</label>
                        <input type='text' id='mName' ref={mNameRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='lName'>Last Name</label>
                        <input type='text' id='lName' ref={lNameRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='personalEmail'>Email Address</label>
                        <input
                            type='text'
                            id='personalEmail'
                            ref={personalEmailRef}
                        />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='userAddress'>Address</label>
                        <input
                            type='text'
                            id='userAddress'
                            ref={userAddressRef}
                        />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='adhaar'>Adhaar</label>
                        <input type='text' id='adhaar' ref={adhaarRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='city'>City</label>
                        <input type='text' id='city' ref={cityRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='state'>State</label>
                        <input type='text' id='state' ref={stateRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='country'>Country</label>
                        <input type='text' id='country' ref={countryRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='isAdmin'>Admin or User</label>
                        <select id='isAdmin' ref={isAdminRef}>
                            <option value='1'>Admin</option>
                            <option value='0' defaultChecked>
                                User
                            </option>
                        </select>
                    </div>
                    <button type='submit' className={styles.submit_button}>
                        Add User
                    </button>
                </form>
                <h2 style={{ margin: '2rem 0' }}>All Users</h2>
                <div className={styles.editBooks_display}>
                    {users.map((ele, i) => (
                        <div className={styles.editBooks_display_item} key={i}>
                            <div className={styles.editBooks_display_item_flex}>
                                <h3>{ele.userName}</h3>
                            </div>
                            <p>
                                <b>Full Name:</b> {ele.fullName}
                            </p>
                            <p>
                                <b>Personal Email:</b> {ele.personalEmail}
                            </p>
                            <div className={styles.editBooks_display_item_flex}>
                                <span onClick={() => DeleteUsers(ele.userName)}>
                                    Delete
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Suspense>
    );
}
