import React, { useContext, useState } from 'react';
import { Button, Form, Grid, Icon, Input, List, Message, Modal, Select } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const RegisterModal = ({ open, close }) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      // props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];

  return (
    <div>
      <Form className={loading ? 'loading' : ''} onSubmit={onSubmit} noValidate>
        <Modal open={open} onClose={close}>
          <Modal.Header>Registro de Usuarios</Modal.Header>
          <Modal.Content>
            {/* <Form.Group widths='equal'></Form.Group> */}
            <Grid columns='three'>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Form.Input
                    label='Nombre de Usuario'
                    placeholder='Nombre de Usuario'
                    name='username'
                    type='text'
                    fluid
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    fluid
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    label='Contraseña'
                    placeholder='Contraseña'
                    name='password'
                    type='password'
                    fluid
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {/* <Form.Group widths='equal'>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                name='confirmPassword'
                type='password'
                value={values.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={onChange}
              />
            </Form.Group>
            {Object.keys(errors).length > 0 && (
              <Message negative>
                <List bulleted>
                  {Object.values(errors).map(value => (
                    <List.Item key={value}>{value}</List.Item>
                  ))}
                </List>
              </Message>
            )} */}
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>
              Cancelar
            </Button>
            <Button
              type='submit'
              positive
              icon='checkmark'
              labelPosition='right'
              content='Registrar Usuario'
              onClick={close}
            />
          </Modal.Actions>
        </Modal>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default RegisterModal;
