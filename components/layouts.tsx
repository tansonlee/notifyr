import {
	Box,
	Flex,
	Text,
	Button,
	Link,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { userAtom } from '../atoms/auth';
import { CgProfile } from 'react-icons/cg';
import { initializeMagicLink } from '../lib/magiclink';
import { errorToast } from '../lib/toast';
import { NotificationMenu } from '@notifyr/sdk';
import { useEffect, useState } from 'react';

export const Layout = ({ children }: { children: JSX.Element }) => {
	const [user, setUser] = useAtom(userAtom);
	const magic = initializeMagicLink();
	const router = useRouter();

	const [clientSecret, setClientSecret] = useState('');

	const handleLogout = async () => {
		setUser(null);

		if (!magic) {
			errorToast({
				description: 'Unexpected error please try refreshing the page.',
			});
			return;
		}

		await magic.user.logout();
		router.push('/dashboard/login');
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(`/api/get-client-secret?groupId=dashboard`);
			const result = await response.json();
			console.log('client secret', result);
			setClientSecret(result.clientSecret);
		})();
	}, []);

	return (
		<Box>
			<Flex p={4} align='center' justify='space-between'>
				<Button
					fontWeight='bold'
					fontSize='lg'
					variant='ghost'
					onClick={() => router.push('/')}
				>
					Notifyr
				</Button>
				<HStack spacing={8}>
					<Link href='https://notifyr.readme.io/reference/getting-started-1' isExternal>
						Documentation
					</Link>
					<Link href='https://www.npmjs.com/package/@notifyr/sdk' isExternal>
						Package
					</Link>
					{user ? (
						<>
							<Link onClick={() => router.push('/dashboard/profile')}>Dashboard</Link>
							{clientSecret && <NotificationMenu clientSecret={clientSecret} />}
							<Flex alignItems='center'>
								<Menu>
									<MenuButton
										as={Button}
										leftIcon={<Icon as={CgProfile} fontSize='2xl' mr={2} />}
									>
										<Text>{user.email}</Text>
									</MenuButton>
									<MenuList>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
									</MenuList>
								</Menu>
							</Flex>
						</>
					) : (
						<Button onClick={() => router.push('/dashboard/login')}>LOGIN</Button>
					)}
				</HStack>
			</Flex>
			{children}
		</Box>
	);
};