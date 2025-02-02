import styles from './sidenav.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SideNav() {
    const query = useSearchParams();
    const id = query.get('id');
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!id) {
            router.replace('/');
        }
        if (id) {
            (async () => {
                try {
                    const response = await axios.get(
                        'http://147.93.102.224:5000/api/Urooj/Verify',
                        {
                            headers: {
                                Authorization: `Bearer ${id}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.data.isAdmin === '1') {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        } else {
            router.replace('/');
        }
    }, [id, router]);

    return (
        <div className={styles.sidenav}>
            <Link href={`/dashboard?id=${id}`}>Profile</Link>
            <Link href={`/dashboard/books?id=${id}`}>Add Books</Link>
            <Link href={`/dashboard/stationary?id=${id}`}>Add Stationary</Link>
            {isAdmin && (
                <Link href={`/dashboard/users?id=${id}`}>Manage Users</Link>
            )}
        </div>
    );
}
