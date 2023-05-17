export const searchParamsToStringQuery = (
  searchParams: URLSearchParams,
): string => {
  let searchParamsString = ''

  const params = new URLSearchParams(searchParams)
  const paramArray = Array.from(params)

  paramArray.forEach(([key, value]) => {
    value = value.replace(/ /g, '_')
    searchParamsString += `${key}=${value}&`
  })
  const fixedSearchParamsString = searchParamsString.slice(0, -1)
  return fixedSearchParamsString
}
