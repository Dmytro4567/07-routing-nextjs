import Notes from './Notes.client';

interface Props {
    params: { slug?: string[] };
}

export default function FilteredNotesPage({ params }: Props) {
    const tag = params.slug?.[0] ?? null;
    return <Notes tag={tag} />;
}