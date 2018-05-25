import React from 'React';
import { NavLink } from 'react-router-dom';

const Issue = (props) => {
  return(
      <li onClick={() => props.handleIssueClick(props.issueId)}>
          <img src={props.issueImg} alt={props.issueName} />
          <p>{props.issueName}</p>
          <p>{props.issueNumber}</p>
      </li>
  )
}

export default Issue; 