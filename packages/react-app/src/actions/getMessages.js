import { setMessages } from './index';

const getMessages = (auth, config) => async (dispatch) => {
  try {
    const accessToken = await auth.getAccessToken();
    /* global fetch */
    const response = await fetch(config.msgSvc.messagesUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      this.setState({ failed: true });
      return;
    }

    // let index = 0;
    const data = await response.json();
    const { allMessages, sentMessages } = data;
    // const messages = data.messages.map((message) => {
    //   const date = new Date(message.date);
    //   const day = date.toLocaleDateString();
    //   const time = date.toLocaleTimeString();
    //   index += 1;
    //   return {
    //     date: `${day} ${time}`,
    //     text: message.text,
    //     id: `message-${index}`,
    //   };
    // });
    dispatch(setMessages({ allMessages, sentMessages, failed: false }));
  } catch (err) {
    // this.setState({ failed: true });

    dispatch(setMessages({ failed: true }));
    /* eslint-disable no-console */
    console.error(err);
  }
};

export default getMessages;
