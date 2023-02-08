import PropTypes from 'prop-types';
import PeepModel from './utils/Peep.model';

const Peep = ({ peep }) => {

  const { firstName, secondName, username, content, dateCreated } = peep;
  return (
    <>
      <div className='row justify-content-center my-5'>
            <div className="card mt-2 col-md-8  rounded-3">
              <div className="card-block border-bottom border-dark p-2  border-opacity-50 bg-white">
                  <small className='card-title float-start'>{firstName} {secondName}</small>
                  <small className="float-end text-muted"> {dateCreated} </small>
                  <br/>
                  <small className='float-start text-muted'>@{username}</small>
              </div>
                <div className="card-footer">
                    <h5 className="card-text pb-3 ps-5 pt-2">{content}</h5>
                </div>
        </div>
        </div>
        </>
    );
};
Peep.propTypes = {
  peep: PropTypes.instanceOf(PeepModel),
}
export default Peep;