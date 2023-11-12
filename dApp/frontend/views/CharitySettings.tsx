import { Stack, Heading, Text, Box, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NewMemberForm } from "../components";
import { getConnectedAccount, isMetaMaskInstalled } from "../helpers/accounts";
import { DSVContract, checkConnectedChainId } from "../helpers/contract";
import Image from 'next/image';

export const CharitySettings = () => {
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
        <Heading my={8} align="center" justify="center">Charity Settings</Heading>
        <Text my={4} >In order to minimize transaction fees on the Ethereum blockchain, you can 
        set a threshold so that funds donated by SDX members will be bundled and automatically
        transferred back to the Ethereum Blockchain once the threshold amount has been reached. </Text>
        <Input 
                placeholder='Enter token amount' 
                mb={4} 
                />
        </Box>
        <Button w={600}>
                Set Automatic Threshold
              </Button>
    </Stack>
  );
};
