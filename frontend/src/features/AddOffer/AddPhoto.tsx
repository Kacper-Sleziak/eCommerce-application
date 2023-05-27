import type { ChangeEvent } from 'react'
import { Button, Grid, IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

export interface Photo {
  id: number
  url: string
}

interface IAddPhotoProps {
  addPhotos(newPhotos: Photo[]): void
  photos: Photo[]
}

const AddPhoto = ({ addPhotos, photos }: IAddPhotoProps) => {
  const handleAddPhoto = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files != null) {
      const newPhotos = Array.from(files).map((file, index) => ({
        id: index,
        url: URL.createObjectURL(file),
      }))
      addPhotos(newPhotos)
    }
  }

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddPhoto}
          />
          <Button
            variant="contained"
            component="span"
            color="primary"
            startIcon={<PhotoCamera />}
          >
            Add Photo
          </Button>
        </label>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        {photos.map(({ id, url }) => (
          <Grid item key={id}>
            <IconButton edge="start" size="medium">
              <img src={url} alt="uploaded" height={70} width={70} />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default AddPhoto
