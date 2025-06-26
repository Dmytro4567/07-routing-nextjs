import Notes from './Notes.client';

export default async function FilteredNotesPage({params}: { params: Promise<{ slug?: string[] }> }) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] ?? null;
    return <Notes tag={tag}/>;
}