import {fetchNotes} from '@/lib/api';
import Notes from './Notes.client';

type FilterPageParams = { slug?: string[] };

export default async function FilteredNotesPage({params}: { params: Promise<FilterPageParams> }) {
    const {slug} = await params;
    const tag = slug?.[0] ?? null;

    const data = await fetchNotes('', 1, 12, tag);

    return <Notes tag={tag} initialData={data}/>;
}
