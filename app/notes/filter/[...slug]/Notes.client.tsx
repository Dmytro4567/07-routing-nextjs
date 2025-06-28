'use client';

import {useState} from 'react';
import css from './Notes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {fetchNotes} from '@/lib/api';
import type {Note} from '@/types/note';
import {useDebounce} from 'use-debounce';
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
    tag?: string | null;
    initialData: { notes: Note[]; totalPages: number };
}

export default function NotesClient({tag, initialData}: NotesClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);
    const [debouncedSearch] = useDebounce(search, 500);

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<{ notes: Note[]; totalPages: number }>({
        queryKey: ['notes', debouncedSearch, page, tag],
        queryFn: () => fetchNotes(debouncedSearch, page, perPage, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
        initialData,
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

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)}/>
                </Modal>
            )}
        </div>
    );
}

