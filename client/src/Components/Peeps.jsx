import Peep from './Peep';
import Post from './Post';
import PeepModel from './utils/Peep.model';

const Peeps = ({ peepData, loggedIn, account, submitAction }) => {
    const { peeps, getError } = peepData;
    const AllPeeps = peeps.map(singlePeep => {
        const { _id, firstName, secondName, username, content, dateCreated } = singlePeep;
        const peep = new PeepModel(firstName, secondName, username, content, dateCreated);
        if (peeps.length > 0) {
            return (<div className='container bg-light'>
                <Peep
                    key={_id}
                    peep={peep}
                />
            </div>);
        } else {
            return (
                <>
                    <h1 className="error">{getError}</h1>
                </>
            );
        }
    })
    if (loggedIn) {
        return (
            <div>
                <Post account={account} submitAction={submitAction} />
                {AllPeeps}
            </div>
                
        );
    } else {
        return (
            <div>
                {AllPeeps}
            </div>
        );
        
    };
};


export default Peeps