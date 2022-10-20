import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input, SkeletonText,
  Text
} from '@chakra-ui/react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

const center = { lat: 10.3157, lng: 123.8854 }

function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [ map, setmap ] = useState(/** @type google.maps.Map */(null))

  if (!isLoaded) {
    return <SkeletonText />
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/*Google map box*/}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            /*streetViewControl: false,*/
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setmap(map)}

        >
          <Marker position={center} />
        </GoogleMap>
      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
      >
        <HStack spacing={4}>
          <Input type='text' placeholder='Origin' />
          <Input type='text' placeholder='Destination' />
          <ButtonGroup>
            <Button colorScheme='pink' type='submit'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App