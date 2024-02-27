import { loremIpsum } from 'lorem-ipsum';

const ChatPage = () => {
    return (
      <>
        <h3>ChatPage</h3>
        <div>
        ChatPage: { loremIpsum({ count: 7})}
        </div>
      </>
    );
};

export default ChatPage;