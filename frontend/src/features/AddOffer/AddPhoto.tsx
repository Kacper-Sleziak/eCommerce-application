import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

interface Photo {
  id: number
  url: string
}

const AddPhoto: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])

  const handleAddPhoto = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target
    if (files != null) {
      const newPhotos = Array.from(files).map((file, index) => ({
        id: index,
        url: URL.createObjectURL(file),
      }))
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Photos:</Typography>
      </Grid>
      <Grid item container alignItems="center" spacing={1}>
        {photos.map(({ id, url }) => (
          <Grid item key={id}>
            <IconButton edge="start" size="medium">
              <img src={url} alt="uploaded" height={40} width={40} />
            </IconButton>
          </Grid>
        ))}
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
      </Grid>
    </Grid>
  )
}

export default AddPhoto
