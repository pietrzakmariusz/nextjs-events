import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
	notification: null, // object: { title, message, status }
	showNotification: function (notificationData) {},
	hideNotification: function () {},
});

export function NotificationContextProvider(props) {
	const [activeNotification, setActiveNotification] = useState();

	useEffect(() => {
		if (
			activeNotification &&
			(activeNotification.status === 'success' ||
				activeNotification.status === 'error')
		) {
			const timer = setTimeout(() => {
				setActiveNotification(null);
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [activeNotification]);

	function showNotificationHanlder(notificationData) {
		setActiveNotification(notificationData);
	}

	function hideNotificationHandler() {
		setActiveNotification(null);
	}

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHanlder,
		hideNotification: hideNotificationHandler,
	};

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
