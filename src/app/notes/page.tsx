import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./CreateNote";

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <div>
        {notes?.map((note: any) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className="p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 my-5">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <h5 className="text-gray-700 text-sm truncate">{content}</h5>
        <p className="text-gray-500 text-xs mt-2">{created}</p>
      </div>
    </Link>
  );
}

type NoteType = {
  id: string;
  title: string;
  content: string;
  created: string;
};

const getNotes = async () => {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getList(1, 20);
  // const res = await fetch(
  //   "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
  //   { cache: "no-store" }
  // );
  // const data = await res.json();
  return data?.items;
};
