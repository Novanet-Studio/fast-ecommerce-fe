/**
 * Simple helper function that avoid try catch hell
 * @param prom Any promise
 * @returns [data, error]
 */
export const handleAsync = async <T>(
  prom: Promise<T>
): Promise<[T | null, any]> => {
  try {
    const data = await prom;
    return [data, null];
  } catch (error) {
    return [null, error?.error ?? error];
  }
};
