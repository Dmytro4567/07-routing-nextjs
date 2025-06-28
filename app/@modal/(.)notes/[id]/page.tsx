import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import NotePreview from './NotePreview.client';

export default async function ModalNotePage({params}: { params: { id: string } }) {
    const queryClient = new QueryClient();
    const id = Number(params.id);

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <NotePreview id={id.toString()}/>
        </HydrationBoundary>
    );
}
