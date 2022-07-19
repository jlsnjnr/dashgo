import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Júnior Andrade</Text>
          <Text color="gray.300" fontSize="small">jnr0444@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Junior Andrade" src="https://media-exp2.licdn.com/dms/image/C4D03AQErODt_PGaOYA/profile-displayphoto-shrink_800_800/0/1655159393885?e=1663200000&v=beta&t=vFZHo0RPl6c753ap1g1qixyoon4ju_uLuCTayyhiLZs" />

    </Flex>
  );
}