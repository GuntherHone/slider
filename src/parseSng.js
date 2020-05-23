export default function parseSng(input, filename) {
  let [metadata, ...verses] = input.split("---");

  metadata = [...metadata.matchAll(/#(.*)=(.*)/g)].reduce((acc, match) => {
    if (match[1] === "VerseOrder") {
      acc[match[1]] = match[2].split(",");
    } else {
      acc[match[1]] = match[2];
    }
    return acc;
  }, {});

  // Fallback to the filename if no Title is available in metadata
  if (!metadata["Title"]) {
    metadata["Title"] = filename;
  }

  verses = verses.map((verse) => {
    const [id, ...words] = verse.trim().split("\n");
    return { id, words: words.join("\n") };
  });

  return { ...metadata, verses };
}
