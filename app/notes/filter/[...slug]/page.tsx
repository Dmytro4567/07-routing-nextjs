import Notes from './Notes.client';

type Props = {
    params: { [key: string]: string | string[] | undefined };
};

export default function FilteredNotesPage({params}: Props) {
    const tag = params.slug?.[0] ?? null;
    return <Notes tag={tag}/>;
}