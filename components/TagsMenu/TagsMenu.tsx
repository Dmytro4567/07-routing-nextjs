'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton}>Notes ▾</button>
            <ul className={css.menuList}>
                {TAGS.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
