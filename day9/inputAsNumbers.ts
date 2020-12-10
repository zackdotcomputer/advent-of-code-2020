export default async function inputAsNumbers(path: string): Promise<number[]> {
  return (await Deno.readTextFile(path)).split("\n").flatMap((l) => {
    const trimmed = l.trim();
    if (trimmed.length === 0) {
      return [];
    } else {
      return [parseInt(trimmed)];
    }
  });
}
