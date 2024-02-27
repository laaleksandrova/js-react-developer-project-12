import { loremIpsum } from 'lorem-ipsum';

const SingUpPage  = () => {
    return (
      <>
        <h3>SingUpPage</h3>
        <div>
          SingUpPage content: { loremIpsum({ count: 4 })}
        </div>
      </>
    );
};

export default SingUpPage;