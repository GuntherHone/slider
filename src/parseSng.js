export default function parseSng(input, filename) {
  const DELIMITERS = new RegExp(
    `(${["vers", "verse", "chor", "chorus", "misc", "refrain", "bridge", "coda"]
      .map((word) => `^${word}(?:\\s\\d+)?$`)
      .join("|")})`,
    "gmi"
  );

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

  verses = verses
    .join("---")
    .split(DELIMITERS)
    .reduce(
      (acc, item) => {
        if (item === "\n") {
          // Ignore double delimiters, eg. "---" and "Verse"
          return acc;
        } else if (acc.key === "") {
          acc.key = item;
        } else {
          acc.result[acc.key] = item
            .split("---")
            .map((line) => line.trim())
            .filter((line) => line !== "");
          acc.key = "";
        }
        return acc;
      },
      { key: "", result: {} }
    ).result;

  console.log(JSON.stringify(verses, null, 2));

  return { ...metadata, verses };
}
