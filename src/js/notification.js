export function requestNotificationPermission() {
    if ("Notification" in window) {
        if (Notification.permission === 'granted') {
            return Promise.resolve();
        } else if (Notification.permission !== 'denied') {
            return Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    return Promise.resolve();
                } else {
                    return Promise.reject('Permission denied');
                }
            });
        } else {
            return Promise.reject('Permission denied');
        }
    } else {
        return Promise.reject('Notifications not supported');
    }
}

export function showNotification(title, options) {
    if ("Notification" in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }
}
