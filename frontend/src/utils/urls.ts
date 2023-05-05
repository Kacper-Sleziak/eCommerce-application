export const addParamsToRequest = (
  request: string,
  searchParams: URLSearchParams,
): string => {
  const searchParamsString = searchParams.toString()

  return `${request}/?${searchParamsString}`
}
