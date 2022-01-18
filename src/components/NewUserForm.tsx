import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

interface IProps {
  onSubmit: ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => void;
}

const NewUserForm = ({ onSubmit }: IProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
    });
    setFirstName("");
    setLastName("");
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name</Label>
        <Input
          required
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name</Label>
        <Input
          required
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">
          Create
        </Button>
      </FormGroup>
    </Form>
  );
};

export default NewUserForm;
