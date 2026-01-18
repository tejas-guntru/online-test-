const ContentEditor = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Content
      </h2>

      <textarea
        className="border w-full p-3 rounded"
        rows={5}
        placeholder="Write notes or paste content here..."
      />

      <div className="mt-4 flex gap-3">
        <button className="border px-3 py-1 rounded">
          Upload PDF
        </button>
        <button className="border px-3 py-1 rounded">
          Add Link
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
