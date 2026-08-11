import PropTypes from 'prop-types';

// Exercise 3
const UserCard2 = ({ name, email }) => {
    return(
        <div className="card">
            <h2>my name is : {name}</h2>
            <p>my email is : {email}</p>
        </div>
    )
}

UserCard2.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};


export default UserCard2