import Notes from './Notes.client';
import {redirect} from "next/navigation";

interface Props {
    params: { slug?: string[] };
}

export default async function FilteredNotesPage({params}: Props) {
    const tag = params?.slug?.[0] ?? null;
    if (!tag) {
        redirect('/'); // или /notes или другой дефолтный маршрут
    }
    return <Notes tag={tag}/>;
}