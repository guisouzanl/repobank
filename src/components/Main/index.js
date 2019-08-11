import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Form,
  SubmitButton,
  List,
  RepositoryDetails,
  RepositoryActions,
} from './styles';
import Container from '../index';
import api from '../../services/api';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    notFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const exists = repositories.find(
        repository => repository.name === newRepo
      );

      if (exists) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        avatar: response.data.owner.avatar_url,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        notFound: false,
      });
    } catch (err) {
      this.setState({
        newRepo: '',
        loading: false,
        notFound: true,
      });
    }
  };

  handleRemoveRepository = async e => {
    const { repositories } = this.state;

    await this.setState({
      repositories: repositories.filter(repo => repo.name !== e.name),
    });

    localStorage.removeItem(JSON.stringify(e));
  };

  render() {
    const { newRepo, loading, repositories, notFound } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} notFound={notFound}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <RepositoryDetails>
                <img src={repository.avatar} alt="avatar" />
                <span>{repository.name}</span>
              </RepositoryDetails>
              <RepositoryActions>
                <button type="button">
                  <Link
                    to={`/repository/${encodeURIComponent(repository.name)}`}
                  >
                    Detalhes
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => this.handleRemoveRepository(repository)}
                >
                  Remover
                </button>
              </RepositoryActions>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
