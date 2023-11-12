import { Stack, Heading, Text, Box, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NewMemberForm } from "../components";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";
import { DSVContract, checkConnectedChainId } from "../helpers/contract";
import Image from 'next/image';

export const DonationSettings = () => {
  const [isCorrectChainId, setCorrectChainId] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [openDescription, setOpenDescription] = useState(false);
  const [isOperator, setOperator] = useState(false);
  const selectCharity = () => {
    setOpenDescription(!openDescription)
  }

  const descriptionCSS = {
    border: `${openDescription ? '4px solid #ccc' : 'none'}`,
    borderRadius: `${openDescription ? '10px' : 'none'}`,
  }

  return (
    <Stack align="center" justify="center">
        <Box p="2" alignItems="center" justify="center" w={600}>
        <Heading my={8} align="center" justify="center">Donation Settings</Heading>
        <Text my={4} >For each transaction, I want to give:</Text>
        <Input 
                placeholder='Enter token amount' 
                mb={4} 
                />
        <Text my={4}>Select a charity to donate to:</Text>
         
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
              

        </Box>
        <Button w={600}>
                Set Automatic Donation
              </Button>
        <Button w={600} variant='ghost' my={4}>I do not want to donate, please deactivate this feature.</Button>
    </Stack>
  );
};
