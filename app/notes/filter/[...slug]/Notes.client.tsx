'use client';

import {useState, useEffect} from 'react';
import css from './Notes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteModal from '@/components/NoteModal/NoteModal';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {fetchNotes} from '@/lib/api';
import type {Note} from '@/types/note';
import {useDebounce} from 'use-debounce';

interface NotesClientProps {
    tag?: string | null;
}

export default function NotesClient({tag}: NotesClientProps) {
    if (tag === undefined) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [tag]);

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<{ notes: Note[]; totalPages: number }>({
        queryKey: ['notes', debouncedSearch, page, tag],
        queryFn: () => {
            return fetchNotes(debouncedSearch, page, perPage, tag);
        },
        placeholderData: keepPreviousData,
        enabled: tag !== undefined,
        refetchOnMount: false,
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange}/>
                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        onPageChange={setPage}
                        totalPages={data.totalPages}
                    />
                )}
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isLoading && <p>Loading notes...</p>}
            {isError && <p>Error loading notes. Please try again later.</p>}

            {isSuccess && data.notes.length > 0 && (
                <NoteList notes={data.notes}/>
            )}

            {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)}/>}
        </div>
    );
}

