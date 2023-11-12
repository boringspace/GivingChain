import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Text
  } from '@chakra-ui/react'
  import Image from 'next/image';
  import { useState } from 'react';

  const descriptionCSS = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    margin: '2rem',
    backgroundColor: 'red',
  }

  export function CharityDonation() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openDescription, setOpenDescription] = useState(false);
    const selectCharity = () => {
      setOpenDescription(!openDescription)
    }

    return (
      <>
        <Button onClick={onOpen}>Deposit</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Support a Charity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
              Would you like to donate to a charity?
              </p>
              <button onClick={selectCharity}>
                <Image src='/../public/TGBLogo.png' alt='The Giving Block Logo' width={200} height={200} />
              </button>
              {openDescription && (
                <Box>
                  <Text fontSize="sm">
                    The Giving Block is a registered 501(c)3 nonprofit organization headquartered in Washington, D.C. that is transforming philanthropy by providing solutions that make giving crypto tax efficient. The Giving Block equips nonprofits to fundraise cryptocurrencies like Bitcoin, providing education, training and a technical solution. For donors, they built the only cryptocurrency donation platform designed specifically for tax optimization. They have partnered with over 250 nonprofits and raised millions in cryptocurrency. The Giving Block’s goal is to make accepting cryptocurrency donations just as easy as credit card donations.
                    </Text>
                    </Box>
                    )}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Donate
              </Button>
              <Button variant='ghost'>No, I don&apos;t want to donate</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }