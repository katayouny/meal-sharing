import PropTypes from 'prop-types';
const ListItemWithBorder = ({ children }) => {
    return (
      <li style={{border: "1px solid rgb(3, 0, 47)",
       listStyleType: "none",
        paddingBottom: "7px",
        paddingTop: "7px",
        marginBottom: "4px", 
        marginRight: "14px", 
        borderRadius: "3px",
        paddingLeft: "20px",
        paddingRight: "20px",
        textAlign: "left",
       
      }}>
        {children}
      </li>
    );
  };
  ListItemWithBorder.propTypes = {
    children: PropTypes.node.isRequired
  };
export default ListItemWithBorder;
