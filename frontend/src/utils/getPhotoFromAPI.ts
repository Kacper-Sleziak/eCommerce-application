import { BACKEND_BASE_URL } from '../config/backend'

export const getPhotoFromAPI = (photos: any) => {
  /* eslint-disable @typescript-eslint/restrict-template-expressions */
  return `${BACKEND_BASE_URL}/photos?path=${photos[0].url}`
}
