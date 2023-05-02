import DeskIcon from '@mui/icons-material/Desk'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import KitchenIcon from '@mui/icons-material/Kitchen'
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import OfferShortcut from '../components/OfferShortcut'
import TabCard from '../components/TabCard'

// import theme from '../utils/materialUI/colorScheme'

const Home = () => {
  return (
    <div
      className="home"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Card
        sx={{
          width: '739px',
          height: '340px',
          background: 'linear-gradient(135deg, #FCA311 14.46%, #14213D 71.94%)',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '50px',
        }}
      >
        <CardContent>
          <Typography
            sx={{
              padding: 2,
              width: '649px',
              height: '176px',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '64px',
              lineHeight: '74px',
              color: '#FFFFFF',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            Save money and buy post-lease goods
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              left: '4%',
              width: '141px',
              height: '53px',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              background: 'rgba(20, 33, 61, 0.7)',
              borderRadius: '10px',
              boxSizing: 'border-box',
              textTransform: 'none',
              fontSize: '18px',
              '&:hover': {
                background: '#121D35',
              },
            }}
          >
            Get started
          </Button>
        </CardActions>
      </Card>
      <TabCard
        to="https://google.pl"
        text="Automotive"
        backgroundColor="#fca311"
        startIcon={DirectionsCarIcon}
      />
      <TabCard
        to="https://google.pl"
        text="Electronics"
        backgroundColor="#14213d"
        startIcon={LaptopChromebookIcon}
      />
      <TabCard
        to="https://google.pl"
        text="Furniture"
        backgroundColor="#14213d"
        startIcon={DeskIcon}
      />
      <TabCard
        to="https://google.pl"
        text="White goods"
        backgroundColor="#fca311"
        startIcon={KitchenIcon}
      />
      <Typography
        variant="h4"
        sx={{
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '32px',
          lineHeight: '37px',
          color: '#000000',
        }}
      >
        Featured items
      </Typography>
      <OfferShortcut
        imageUrl="https://static2.swiat-krzesel.pl/pol_pl_Fotel-biurowy-gabinetowy-z-wysuwem-siedziska-JAWA-krzeslo-biurowe-obrotowe-czarne-17357_1.jpg"
        title="Krzesło biurowe, obrotowe"
        price="1200 zł"
      />
      <OfferShortcut
        imageUrl="https://mi-store.pl/pol_pm_Monitor-Xiaomi-Mi-Desktop-Monitor-1C-23-8-IPS-1179_3.jpg"
        title="Monitor"
        price="500 zł"
      />
      <OfferShortcut
        imageUrl="https://ergonome.pl/wp-content/uploads/2022/09/eco-compact-1600x1280.jpg"
        title="Biurko elektryczne"
        price="1450 zł"
      />
      <OfferShortcut
        imageUrl="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
        title="Samochód maluch"
        price="6200 zł"
      />
      <OfferShortcut
        imageUrl="https://delkom.pl/pic/14A9/327322/mysz-bezprzewodowa-logitech-mx-anywhere-3-rozowa-910-005990-widok-frontu-jpg-720x.png"
        title="Myszka bezprzewodowa"
        price="200 zł"
      />
    </div>
  )
}

export default Home
