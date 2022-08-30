import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddChannelModal } from "client/components/CreateSerie/AddChannelModal";
import { FormError } from "client/components/UI/FormError";
import Layout from "client/components/UI/Layout";
import { useIntl } from "client/hooks/useIntl";
import { createSerieDTO } from "DTOs/serie";
import { FormProvider, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import * as yup from "yup";
const CreatePage = () => {
  const { t } = useIntl("createSerie");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const methods = useForm<yup.InferType<typeof createSerieDTO>>({
    resolver: yupResolver(createSerieDTO),
  });
  const { handleSubmit, register } = methods;
  return (
    <Layout title={t("title")}>
      <AddChannelModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Flex align="center" flexDirection="column">
        <FormProvider {...methods}>
          <form>
            <VStack w="xs">
              <FormControl>
                <FormLabel>{t("fields.name")}</FormLabel>
                <Input {...register("name")} />
                <FormError name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>{t("fields.description")}</FormLabel>
                <Textarea rows={10} {...register("description")} />
              </FormControl>
            </VStack>
          </form>
        </FormProvider>
        <Grid
          w="full"
          px={8}
          mt={10}
          gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
        >
          {/* <GridItem>
            <Box w={100} h={100} bg="blue.100" />
          </GridItem> */}
          <GridItem>
            <IconButton
              onClick={onOpen}
              aria-label="Add"
              icon={<FaPlus fontSize={50} />}
              w={100}
              h={100}
            ></IconButton>
          </GridItem>
        </Grid>
      </Flex>
    </Layout>
  );
};

export default CreatePage;
