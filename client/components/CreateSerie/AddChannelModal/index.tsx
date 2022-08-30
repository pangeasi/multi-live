import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalOverlay,
  Select,
  Center,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormError } from "client/components/UI/FormError";
import { useIntl } from "client/hooks/useIntl";
import { createChannelDTO } from "DTOs/channel";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

type AddChannelModalProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

export const AddChannelModal = ({ isOpen, onClose }: AddChannelModalProps) => {
  const { t } = useIntl("createSerie");
  const methods = useForm<yup.InferType<typeof createChannelDTO>>({
    resolver: yupResolver(createChannelDTO),
  });
  const { handleSubmit, register } = methods;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("modal.header")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <form>
              <Center>
                <VStack w="xs">
                  <FormControl>
                    <FormLabel>{t("modal.fields.name")}</FormLabel>
                    <Input {...register("name")} />
                    <FormError name="name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>{t("modal.fields.platform")}</FormLabel>
                    <Select {...register("platform")}></Select>
                    <FormError name="platform" />
                  </FormControl>
                </VStack>
              </Center>
            </form>
          </FormProvider>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            cancel
          </Button>
          <Button colorScheme="blue" mr={3}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
