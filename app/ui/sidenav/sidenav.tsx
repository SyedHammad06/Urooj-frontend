import styles from './sidenav.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
                    const response = await fetch(`/api/Urooj/Verify?id=${id}`);
                    const data = await response.json();

                    if (data.isAdmin === '1') {
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
