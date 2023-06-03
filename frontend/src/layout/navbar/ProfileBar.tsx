/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import { selectUserAuth } from '../../store/slices/UserDataSlice'

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
  const userAuth = useSelector(selectUserAuth)

  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    // if (anchorRef.current?.contains(event.target as HTMLElement)) {
    //  return
    // }
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

  const navigateToAddOffer = () => {
    navigate('/addoffer')
  }

  const renderProfileButton = () => {
    if (userAuth !== null) {
      return (
        <Button
          ref={anchorRef}
          aria-controls={isOpen ? 'menu-list' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <AccountCircle />
        </Button>
      )
    }
    return null
  }

  return (
    <>
      {renderProfileButton()}
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
                    onClick={navigateToAddOffer}
                    sx={{
                      '&:hover': {
                        background: '#FCA311',
                        color: '#fff',
                      },
                    }}
                  >
                    Add Offer
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
