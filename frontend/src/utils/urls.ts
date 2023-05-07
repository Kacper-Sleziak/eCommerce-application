export const searchParamsToStringQuery = (
  searchParams: URLSearchParams,
): string => {
  var searchParamsString = ''

  const params = new URLSearchParams(searchParams)
  const paramArray = Array.from(params)

  paramArray.forEach(([key, value]) => {
    searchParamsString += `${key}=${value}, `
  })
  const fixedSearchParamsString = searchParamsString.slice(0, -2)
  return fixedSearchParamsString
}
