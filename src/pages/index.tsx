import { Flex, Button, Stack } from "@chakra-ui/react";
import Head from "next/head";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signFormSchema),
  });

  const { errors } = formState;
  
  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return (
    <>
      <Head>
        <title>Entrar | dashgo.</title>
      </Head>
      
      <Flex 
        w="100vw" 
        h="100vh" 
        alignItems="center" 
        justifyContent="center"
      >
        <Flex 
          as="form" 
          w="100%" 
          maxWidth={360} 
          bg="gray.800" 
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input name="email" type="email" label="E-mail" error={errors.email} {...register("email")} />
            <Input name="password" type="password" required label="Senha" {...register('password')} />
          </Stack>
          <Button isLoading={formState.isSubmitting} type="submit" mt="6" colorScheme="pink" bg='pink.500' color='white' size="lg">Entrar</Button>
        </Flex>
      </Flex>
    </>
  );
}
