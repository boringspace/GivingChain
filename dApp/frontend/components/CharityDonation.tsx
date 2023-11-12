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
    useToast,
    Input
  } from '@chakra-ui/react'
  import Image from 'next/image';
  import { useState } from 'react';  
  import { useRouter } from "next/router";
  import { DSVContract } from "../helpers/contract";
  import { formatAddress, txScannerURL } from "../helpers/accounts";
  import { upsertDeposit } from "../helpers/api";
  import { ethers } from "ethers";
  import { DepositIntent, computeDepositIntentHash } from "../helpers/types";

  type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    connectedAddress: string;
    memberId: string;
    //tokenAddress: string;
  }

  export function CharityDonation(props: Props) {
    const [openDescription, setOpenDescription] = useState(false);
    const [donationAmount, setDonationAmount] = useState<string>("");
    const [isLoading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose, connectedAddress, memberId /* tokenAddress  */} = props;
    const toast = useToast();
    const router = useRouter();

    const charityAddress = '0x8B9d41fd4B92e6C692f74D0Ca5664e92b0E69b59'
    const tokenAddress = '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43'

    const donate = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
  
      try {
        const dsvContract = new DSVContract();
  
        const depositIntent: DepositIntent = {
          sender: formatAddress(charityAddress),
          tokenAddress: formatAddress(tokenAddress),
          initiatorAddress: formatAddress(connectedAddress),
          receiverId: memberId,
          amount: ethers.utils.parseEther(donationAmount),
        };
  
        const txHash = await dsvContract.submitDepositIntent(depositIntent);
  
        const depositIntentHash = computeDepositIntentHash(depositIntent);
  
        const deposit = await upsertDeposit({
          id: depositIntentHash,
          ...depositIntent,
          amount: donationAmount, // override amount to write it in string form
          submitTx: txHash,
          cancelTx: null,
          confirmTx: null,
        });
  
        console.log(deposit);
  
        console.log(
          "DI Submitted. Is active: ",
          await dsvContract.isDepositIntentActive(depositIntentHash)
        );

        onClose();
  
        toast({
          title: "Transaction successfully submitted.",
          description: (
            <>
              Tx hash: {"\n"}
              <a href={txScannerURL(txHash)} target="_blank" rel="noreferrer">
                {txHash}
              </a>
              .
            </>
          ),
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
          onCloseComplete: () => router.push("/operations"),
        });
      } catch (error) {
        toast({
          title: "Request failed",
          description: (error as Error)?.message,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
        setLoading(false);
      }
    };

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
                value={donationAmount} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDonationAmount(event.currentTarget.value)} 
                placeholder='Enter token amount' 
                mb={4} 
                isInvalid={!isAmountValid(donationAmount)}
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
              <Button isLoading={isLoading} mr={3} onClick={(event) => donate(event)}>
                Donate
              </Button>
              <Button variant='ghost' mr={3} onClick={onClose}>No, I don&apos;t want to donate</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }