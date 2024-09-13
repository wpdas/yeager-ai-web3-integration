import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { dispatch, useTypedSelector } from "@/store";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export const GlobalDialog = () => {
  const { title, message, isOpen, type, goTo } = useTypedSelector(
    (state) => state.globalDialog,
  );
  const cancelRef = useRef<any>();
  const navigate = useNavigate();

  const onCloseHandler = useCallback(() => {
    if (goTo) {
      navigate(goTo);
    }
    dispatch.globalDialog.clear();
  }, [navigate, goTo]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseHandler}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onCloseHandler}
              colorScheme={type === "normal" ? "purple" : "orange"}
            >
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
