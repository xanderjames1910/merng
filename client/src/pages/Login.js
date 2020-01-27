import React, { useContext, useState } from 'react';
import { Card, Button, Form, Grid, List, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

// import { login } from '../store/actions/authActions';

const Login = props => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      // login(userData);
      props.history.push('/inicio');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return context.user ? (
    <Redirect to='/inicio' />
  ) : (
    <div>
      <Grid style={{ margin: 0 }}>
        <Grid.Column width={9} className='login-background' />
        <Grid.Column width={7}>
          <Form className={loading ? 'loading centered-item' : 'centered-item'} onSubmit={onSubmit} noValidate>
            <Card style={{ width: 390 }}>
              <Card.Content>
                <Card.Header style={{ textAlign: 'center', marginBottom: 10 }}>Ingreso de Usuarios</Card.Header>
                <Form.Input
                  label='Nombre de Usuario'
                  placeholder='Nombre de Usuario'
                  name='username'
                  type='text'
                  value={values.username}
                  error={errors.username ? true : false}
                  onChange={onChange}
                />
                <Form.Input
                  label='Contraseña'
                  placeholder='Contraseña'
                  name='password'
                  type='password'
                  value={values.password}
                  error={errors.password ? true : false}
                  onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (
                  <Message negative>
                    <List bulleted>
                      {Object.values(errors).map(value => (
                        <List.Item key={value}>{value}</List.Item>
                      ))}
                    </List>
                  </Message>
                )}
              </Card.Content>
              <Card.Content extra>
                <Button type='submit' primary>
                  Ingresar
                </Button>
              </Card.Content>
            </Card>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     login: (username, password) => dispatch(login(username, password)),
//   };
// };

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
