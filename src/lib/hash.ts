/**
 * Hashes a string to a number between 0 and max
 */
export function hash(text: string, max: number): number {
  return (
    text.split("").reduce((acc, cur) => {
      const charCode = cur.charCodeAt(0);
      return acc + charCode;
    }, 0) % max
  );
}
