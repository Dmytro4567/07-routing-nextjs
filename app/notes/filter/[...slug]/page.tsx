import Notes from './Notes.client';

export default async function FilteredNotesPage({
                                                    params,
                                                }: {
    params: { slug?: string[] };
}) {
    const tag = params.slug?.[0] ?? null;
    return <Notes tag={tag}/>;
}