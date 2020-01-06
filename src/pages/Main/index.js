import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuarios',
  };

  // props navigation has the method navigate, so it is a shape (an object)
  // inside the shape we have a fn navigate, so it should be a func
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    // To check all usable props ()
    // console.tron.log(this.props);
    // Inside of it we have the navigation and inside of it we also have
    // (pop, push, replace, reset, goBack and amoung other the 'navigate')
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    // Always desconstruct props and state (eslint/prettier also ask for it)
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuario"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users} // PRECISA SER ARRAY
          keyExtractor={user => user.login} // KeyExtrator: Semelhante a funcao map, e a chave obrigatoria key
          renderItem={(
            { item } // recebe fn, retorna jsx, desestrutura e pega item == user(acima)
          ) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              {/* source == src (igual do img no react) - precisa mandar uma url
              Primeira chave: codigo javascript Segunda chave: Adicionando um
              objeto dentro do source Envia uma propriedade uri e passar entao o
              src da img */}
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              {/* Important note to the fn below:
               -- this.handleNavigate() :
               --- executes the function, without passing it as reference
               -- () => this.handleNavigate(item)
               --- can be used to pass fn reference as argument to the function we want to access */}
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
