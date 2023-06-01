/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

interface UserProfileDropdownProps {
  onLogout: () => void
  onMyProfile: () => void
}

const ProfileBar: React.FC<UserProfileDropdownProps> = ({
  onLogout,
  onMyProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    // if (anchorRef.current?.contains(event.target as HTMLElement)) {
    //  return
    // }
    // console.log("test")
    setIsOpen(false)
  }

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  const handleMyProfile = () => {
    onMyProfile()
    setIsOpen(false)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={isOpen ? 'menu-list' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircle />
      </Button>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={isOpen} id="menu-list">
                  <MenuItem
                    onClick={handleMyProfile}
                    sx={{
                      '&:hover': {
                        background: '#FCA311',
                        color: '#fff',
                      },
                    }}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        background: '#FCA311',
                        color: '#fff',
                      },
                    }}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default ProfileBar
