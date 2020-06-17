import React, { useState, useContext } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { OrganiserContext } from "../../Context/Context";

const MultipleSelectMembers = ({
  members,
  teamMembers,
  handleChangeMembers,
}) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { state } = useContext(OrganiserContext);
  const { editCard } = state;

  const createMembersArray = (members) => {
    let membersString = members;
    let membersArray = membersString.split(",");
    return membersArray;
  };

  return (
    <Input
      type="select"
      name="select"
      id="exampleSelect"
      onChange={(e) => handleChangeMembers(e.target.selectedOptions)}
      multiple
    >
      {editCard === false
        ? createMembersArray(teamMembers).map((value, index) => (
            <option value={value} key={index}>
              {value}
            </option>
          ))
        : createMembersArray(state.selectedBoardValue.teamMembers)}
    </Input>
  );
};

export default MultipleSelectMembers;
