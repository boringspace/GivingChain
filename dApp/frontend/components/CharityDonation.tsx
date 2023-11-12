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
    Text,
    Input
  } from '@chakra-ui/react'
  import Image from 'next/image';
  import { useState } from 'react';  

  export function CharityDonation() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openDescription, setOpenDescription] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    const isAmountValid = (amount: string) => {
      const validShareRegEx = /^\d{1,3}(\.\d{0,6})?$/;
      return validShareRegEx.test(amount);
    };

    const selectCharity = () => {
      setOpenDescription(!openDescription)
    }

    const descriptionCSS = {
      border: `${openDescription ? '4px solid #ccc' : 'none'}`,
      borderRadius: `${openDescription ? '10px' : 'none'}`,
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
              <Text pb={4}>
              Would you like to donate to a charity?
              </Text>
              <Input 
                value={amount} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(event.currentTarget.value)} 
                placeholder='Enter token amount' 
                mb={4} 
                isInvalid={!isAmountValid(amount)}
                />
              <button onClick={selectCharity} >
                <Image src='/../public/TGBLogo.png' alt='The Giving Block Logo' width={200} height={200} style={descriptionCSS}/>
              </button>
              {openDescription && (
                <Box mt={2}>
                  <Text fontSize="sm">
                    The Giving Block is a registered 501(c)3 nonprofit organization headquartered in Washington, D.C. that is transforming philanthropy by providing solutions that make giving crypto tax efficient. The Giving Block equips nonprofits to fundraise cryptocurrencies like Bitcoin, providing education, training and a technical solution. For donors, they built the only cryptocurrency donation platform designed specifically for tax optimization. They have partnered with over 250 nonprofits and raised millions in cryptocurrency. The Giving Block’s goal is to make accepting cryptocurrency donations just as easy as credit card donations.
                    </Text>
                    </Box>
                    )}
               
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={isLoading} type="submit" mr={3} onClick={onClose}>
                Donate
              </Button>
              <Button variant='ghost' mr={3} onClick={onClose}>No, I don&apos;t want to donate</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }