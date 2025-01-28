// import PocketBase from "pocketbase";

import Link from "next/link";

async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    { next: { revalidate: 10 } }
  );
  // const db = new PocketBase("http://127.0.0.1:8090");
  // const data = await db.collection("notes").getOne(noteId)
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  const createdDate = new Date(note.created);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    weekday: 'long', // Example: Monday
    year: 'numeric', // Example: 2025
    month: 'long', // Example: January
    day: 'numeric', // Example: 28
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-8">
      <div className="flex justify-between items-center mb-4">
        {/* Back to Parent Button ƒ*/}
        <Link href="/notes">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out">
            &larr; Back to Notes
          </span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Note {note.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{note.title}</h3>
        <h5 className="text-lg text-gray-700 mb-4">{note.content}</h5>
        <p className="text-gray-500 text-sm">Created on: {formattedDate}</p>
      </div>
    </div>
  );
}
