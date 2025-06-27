'use client';

import {use} from 'react';
import {useRouter} from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';

export default function ModalNotePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Modal onClose={handleClose}>
            <NotePreview id={id}/>
        </Modal>
    );
}