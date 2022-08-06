import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user; 
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  }

  return (  
    <>
      <Head>
        <title>Criar usuário | dashgo.</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
          
          <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["8", "8"]}>
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
            <Divider my="6" borderColor="gray.800" />

            <VStack spacing={["2", "8"]}>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input {...register("name")} name="name" type="text" label="Nome completo" />
                <Input {...register("email")} name="email" label="Email" type="email" />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input {...register("password")} name="password" type="password" label="Senha" /> 
                <Input {...register("password_confirmation")} name="password_confirmation" label="Confirmar senha" type="password" />
              </SimpleGrid>
            </VStack>
            

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button isLoading={formState.isSubmitting} type="submit" colorScheme="pink">Salvar</Button>
              </HStack>
            </Flex>
          </Box>

        </Flex>
      </Box>
    </>
  );
}