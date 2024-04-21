import PropTypes from 'prop-types';
const ListItemWithBorder = ({ children }) => {
    return (
      <li style={{border: "1px solid rgb(3, 0, 47)",
       listStyleType: "none",
        paddingTop: "12px",
        paddingRight: "12px",
        paddingBottom: "12px",
        paddingLeft: "12px",
        marginRight: "200px",
        marginBottom: "4px",
        borderRadius: "3px",
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
