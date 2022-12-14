import {
	createStandaloneToast,
	ToastPosition,
	ToastPositionWithLogical,
	useToast,
} from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const errorToast = ({
	description,
	title = '',
	position = 'top',
	durationInMilliseconds = 5 * 1000,
}: {
	description: string;
	title?: string;
	durationInMilliseconds?: number | null;
	position?: ToastPosition;
}) => {
	toast({
		status: 'error',
		title,
		description,
		position,
		duration: durationInMilliseconds,
		isClosable: true,
	});
};

export const successToast = ({
	description,
	title = '',
	position = 'top',
	durationInMilliseconds = 5 * 1000,
}: {
	description: string;
	title?: string;
	durationInMilliseconds?: number | null;
	position?: ToastPosition;
}) => {
	toast({
		status: 'success',
		title,
		description,
		position,
		duration: durationInMilliseconds,
		isClosable: true,
	});
};
