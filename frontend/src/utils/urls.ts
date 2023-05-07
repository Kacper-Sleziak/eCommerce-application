export const addParamsToRequest = (
  request: string,
  searchParams: URLSearchParams,
): string => {
  const params = new URLSearchParams(searchParams)
  const paramArray = Array.from(params)

  var searchParamsString = ''
  paramArray.forEach(([, value]) => {
    searchParamsString += `${value}, `
  })

  const fixedSearchParamsString = searchParamsString.slice(0, -1)
  console.log(fixedSearchParamsString)

  return `${request}?${fixedSearchParamsString}`
}
