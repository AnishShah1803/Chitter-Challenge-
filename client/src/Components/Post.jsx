import { useState } from 'react';
import PeepModel from './utils/Peep.model';

const Post = ({ account , submitAction}) => {
      const [content, setContent] = useState('');
      let textinput = "";
      const updateContent = e => {
        textinput = document.getElementById("content").value;
          setContent(textinput);
      }
      const submitLogin = (e) => {
        e.preventDefault();
        const firstName = account.firstName;
        const secondName = account.secondName;
        const username = account.username;
        const dateCreated = new Date().toLocaleString();
        const post = new PeepModel(firstName, secondName, username, content, dateCreated);
        submitAction(post)
      }
  return (
      <>
        <div className='row'>
            <div className="card mt-8 mb-8 rounded-3">
                <div className="card-block border-bottom border-dark p-2  border-opacity-50 bg-white">
                    <small className='card-title float-start'>{account.firstName} {account.secondName}</small>
                    <small className='float-end text-muted'>@{account.username}</small>
                </div>
            <div className="card-footer">
            <form className="card form" onSubmit={submitLogin}>
                    <div className='row justify-content-center'>
                        <div className="form-outline col-md-6 mt-4">
                              <input type="text" id="content" className="form-control" placeholder='peep...' onChange={updateContent} required />
                              <label className="form-label" htmlFor="content">Post Your Peep</label>
                        </div>
                        <div>
                              <button type="submit" className="btn btn-primary btn-block mx-2 mb-2 col-lg-2 float-end">Post It!</button>
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default Post;